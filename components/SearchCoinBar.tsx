import { CustomThemeType } from "@/themes/themes";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import {
  Button,
  IconButton,
  Searchbar,
  TextInput,
  useTheme,
} from "react-native-paper";

type SearchCoinBarProps = {
  handleSearch: (input: string) => void;
  addNotification: (text: string, type: "SUCCESS" | "ERROR" | "INFO") => void;
};
export const SearchCoinBar = ({
  handleSearch,
  addNotification,
}: SearchCoinBarProps) => {
  const [input, setInput] = useState("");
  const theme: CustomThemeType = useTheme();

  const handlerSubmitSearch = useCallback(() => {
    handleSearch(input);
    addNotification("Coins have been updated", "SUCCESS");
  }, [handleSearch, input]);

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
        value={input}
        style={{ margin: 10, flex: 1 }}
        clearButtonMode="never"
        underlineStyle={{ display: "none" }}
      />
      <IconButton icon={"filter"} onPress={handlerSubmitSearch} />
    </View>
  );
};

export default SearchCoinBar;
