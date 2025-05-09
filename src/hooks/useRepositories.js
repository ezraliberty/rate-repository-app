import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (sort, searchKeyword) => {
  let variables = {};

  switch (sort) {
    case "highest":
      variables = { orderBy: "RATING_AVERAGE", orderDirection: "DESC", searchKeyword };
      break;
    case "lowest":
      variables = { orderBy: "RATING_AVERAGE", orderDirection: "ASC", searchKeyword };
      break;
    default:
      variables = { orderBy: "CREATED_AT", orderDirectory: "DESC", searchKeyword };
  }

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });
  return { repositories: data ? data.repositories : undefined, loading, error };
};

export default useRepositories;
