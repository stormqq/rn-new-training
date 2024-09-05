import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  IconButton,
  Searchbar,
  TextInput,
  useTheme,
} from "react-native-paper";

export const SearchCoinBar = ({
  handleSearch,
}: {
  handleSearch: (input: string) => void;
}) => {
  const [input, setInput] = useState("");
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <TextInput
        placeholder="Search.."
        onChangeText={setInput}
        onSubmitEditing={() => handleSearch(input)}
        value={input}
        style={{ margin: 10, flex: 1 }}
        clearButtonMode="never"
        underlineStyle={{ display: "none" }}
      />
      <IconButton icon={"filter"} onPress={() => handleSearch(input)} />
    </View>
  );
};

export default SearchCoinBar;
