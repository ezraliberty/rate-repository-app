import { createContext, useContext, useEffect, useReducer } from "react";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { AUTHENTICATE_USER } from "../graphql/mutations";
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
        user: action.payload,
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
      return { ...state, loading: true, error: null };
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
      console.log("data", data);
      if (data.authenticate.accessToken) {
        await authStorage.setAccessToken(data.authenticate.accessToken);
        console.log("token", data.authenticate.accessToken);
        await fetchUser();
        console.log("finish signIn");
        dispatch({ type: "SIGN_IN_SUCCESS" });
        console.log("load", data.authenticate.user);
        console.log("state", state);
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
      apolloClient.resetStore();
      dispatch({ type: "SIGN_OUT" });
      navigate("/signin");
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
    dispatch({ type: "LOADING", payload: false });
  };

  const fetchUser = async () => {
    dispatch({ type: "LOADING" });
    console.log("fetchUser func");
    try {
      console.log("working");
      const { data, error } = await apolloClient.query({
        query: ME,
        fetchPolicy: "cache-first", // Changed fetchPolicy
      });
  
      if (error) {
        console.error("Apollo Query Error:", error);
        dispatch({ type: "ERROR", payload: error.message });
        dispatch({ type: "SET_USER", payload: null });
        return;
      }
  
      console.log("Apollo Client instance:", apolloClient);
      console.log("ME query:", ME);
      console.log("fetchUser data:", data);
  
      dispatch({ type: "SET_USER", payload: data?.me });
    } catch (error) {
      console.error("Fetch User Error (Catch Block):", error);
      dispatch({ type: "ERROR", payload: error.message });
      dispatch({ type: "SET_USER", payload: null });
    } finally {
      dispatch({ type: "LOADING", payload: false }); // Ensure loading is set to false
    }
  };
//   const fetchUser = async () => {
//     dispatch({ type: "LOADING" });
//     console.log("fetchUser func");
//     try {
//       console.log("working");
//       const { data, loading, error } = await apolloClient.query({
//         query: ME,
//         fetchPolicy: "cache-and-network",
//       });
//       console.log("err", error)
//       console.log("apolloClient instance:", apolloClient);
//       console.log("ME query:", ME);
//       console.log("fetworkchUser");

//       console.log("fetchUser", data);
//       dispatch({ type: "SET_USER", payload: data.me });
//     } catch (error) {
//       dispatch({ type: "ERROR", payload: error.message });
//       dispatch({ type: "SET_USER", payload: null });
//     }
//   };

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

  const value = { state, dispatch, signIn, signOut };
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
