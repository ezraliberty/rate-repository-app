import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (repositoryId) => {
  let variables = {
    repositoryId,
    first: 8,
  };

  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORY,
    {
      variables,
      fetchPolicy: "cache-and-network",
      skip: !repositoryId,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) return;

    return fetchMore({
      variables: {
        reviewsAfter2: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    reviews: data?.repository?.reviews,
    fetchMore: handleFetchMore,
    loading,
    error,
    ...result
  };
};

export default useRepository;
