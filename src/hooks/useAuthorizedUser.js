import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = () => {
  const { data, error, loading } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network'
  });
  
  if (loading) return { loading };
  const authorizedUser = data.authorizedUser;
  return { authorizedUser, error, loading };
};

export default useAuthorizedUser;