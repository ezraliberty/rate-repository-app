import { Picker } from "@react-native-picker/picker";

const FilterPicker = ({ sort, onSortChange }) => {
  return (
    <Picker
      selectedValue={sort}
      onValueChange={(itemValue, itemIndex) => onSortChange(itemValue)}
    >
      <Picker.Item label="Latest Repositories" value="latest" />
      <Picker.Item label="Higest Rated Repositories" value="highest" />
      <Picker.Item label="Lowest Rated Repositories" value="lowest" />
    </Picker>
  );
};

export default FilterPicker;
