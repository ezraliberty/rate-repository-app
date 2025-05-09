import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";

const Filter = ({ sort, onSortChange, searchQuery, onTextChange }) => {
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onTextChange}
        value={searchQuery}
      />
      <Picker
        selectedValue={sort}
        onValueChange={(itemValue, itemIndex) => onSortChange(itemValue)}
      >
        <Picker.Item label="Latest Repositories" value="latest" />
        <Picker.Item label="Higest Rated Repositories" value="highest" />
        <Picker.Item label="Lowest Rated Repositories" value="lowest" />
      </Picker>
    </>
  );
};

export default Filter;
