import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";

const RepositoryList = () => {
  const { repositories } = useRepositories();

  console.log("repositories RLC", repositories);

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
