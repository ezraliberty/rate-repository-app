import { useState } from "react";
import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";

const RepositoryList = () => {
  const [sort, setSort] = useState("latest");
  const { repositories } = useRepositories(sort);

  const handleSortChange = (value) => {
    setSort(value);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      sort={sort}
      onSortChange={handleSortChange}
    />
  );
};

export default RepositoryList;
