import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (variables) => {
  const { data, error, loading, fetchMore } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.authorizedUser.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables
      }
    });
  };

  if (loading) return { loading };
  return {
    authorizedUser: data?.authorizedUser,
    error,
    loading,
    fetchMore: handleFetchMore
  };
};

export default useAuthorizedUser;