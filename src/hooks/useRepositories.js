import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sort, searchKeyword) => {
  let variables = {};

  switch (sort) {
    case "highest":
      variables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
        searchKeyword,
        repositoriesFirst2: 8,
      };
      break;
    case "lowest":
      variables = {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
        searchKeyword,
        repositoriesFirst2: 8,
      };
      break;
    default:
      variables = {
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
        searchKeyword,
        repositoriesFirst2: 8,
      };
  }

  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) return;

    return fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    error,
    ...result,
  };
};

export default useRepositories;
