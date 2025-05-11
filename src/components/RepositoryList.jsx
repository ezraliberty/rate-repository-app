import { useState } from "react";
import useRepositories from "../hooks/useRepositories";
import RepositoryListContainerWithNavigation from "./RepositoryListContainer";
import { useDebounce } from "use-debounce";

const RepositoryList = () => {
  const [sort, setSort] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryDebounced] = useDebounce(searchQuery, 500);
  const { repositories, fetchMore } = useRepositories({
    sort,
    searchQueryDebounced,
  });

  const handleSortChange = (value) => {
    setSort(value);
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainerWithNavigation
      repositories={repositories}
      sort={sort}
      onSortChange={handleSortChange}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
