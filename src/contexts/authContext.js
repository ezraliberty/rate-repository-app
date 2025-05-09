import { createContext, useContext, useEffect, useReducer } from "react";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { AUTHENTICATE_USER, CREATE_USER } from "../graphql/mutations";
import { ME } from "../graphql/queries";
import { useNavigate } from "react-router-native";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    case "SET_USER":
      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload !== undefined ? action.payload : true,
        error: null,
      };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default: {
      return state;
    }
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signIn = async ({ username, password }) => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await apolloClient.mutate({
        mutation: AUTHENTICATE_USER,
        variables: { credentials: { username, password } },
      });
      if (data.authenticate.accessToken) {
        await authStorage.setAccessToken(data.authenticate.accessToken);
        await fetchUser();
        apolloClient.resetStore();
        dispatch({ type: "SIGN_IN_SUCCESS" });
        navigate("/");
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
      dispatch({ type: "LOADING", payload: false });
      return false;
    }
  };

  const signUp = async ({ username, password }) => {
    dispatch({ type: "LOADING" });
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_USER,
        variables: { user: { username, password } },
      });
      if (data.createUser) {
        await signIn({ username, password });
        navigate("/");
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
      dispatch({ type: "LOADING", payload: false });
      return false;
    }
  };

  const signOut = async () => {
    dispatch({ type: "LOADING" });
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      dispatch({ type: "SIGN_OUT" });
      navigate("/signin");
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
      dispatch({ type: "LOADING", payload: false });
    }
  };

  const fetchUser = async () => {
    dispatch({ type: "LOADING" });
    try {
      const { data, error } = await apolloClient.query({
        query: ME,
        fetchPolicy: "network-only",
      });

      console.log("User data:", data);
      if (error) {
        dispatch({ type: "ERROR", payload: error.message });
        dispatch({ type: "SET_USER", payload: null });
        return;
      }
      dispatch({ type: "SET_USER", payload: data?.me });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
      dispatch({ type: "SET_USER", payload: null });
    } finally {
      dispatch({ type: "LOADING", payload: false });
    }
  };

  useEffect(() => {
    const checkAuthOnStart = async () => {
      const token = await authStorage.getAccessToken();
      if (token) {
        await fetchUser();
      } else {
        dispatch({ type: "SET_USER", payload: null });
      }
    };

    checkAuthOnStart();
  }, [authStorage, apolloClient]);

  const value = { state, dispatch, signIn, signOut, signUp };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
