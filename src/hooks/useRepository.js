import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (repositoryId) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: "cache-and-network",
    skip: !repositoryId,
  });

  return { repository: data ? data.repository : undefined, reviews: data?.repository?.reviews, loading, error };
};

export default useRepository;
