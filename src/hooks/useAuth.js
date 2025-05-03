import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data && data.me) {
      setIsAuthenticated(true);
      setUser(data.me);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [data]);

  return {
    isAuthenticated,
    user,
    loading,
    error,
  };
};

export default useAuth;