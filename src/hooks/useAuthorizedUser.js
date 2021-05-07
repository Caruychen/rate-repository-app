import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (variables) => {
  const { data, error, loading, fetchMore, refetch } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
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

  return {
    authorizedUser: data?.authorizedUser,
    error,
    loading,
    fetchMore: handleFetchMore,
    refetch
  };
};

export default useAuthorizedUser;