import { CustomThemeType } from "@/src/themes/themes";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { IconButton, TextInput, useTheme } from "react-native-paper";
import styled from "styled-components/native";

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
    <Container theme={theme}>
      <StyledTextInput
        placeholder="Search.."
        onChangeText={setInput}
        value={input}
        clearButtonMode="never"
        underlineStyle={{ display: "none" }}
      />
      <IconButton
        icon={{
          uri: "https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png",
        }}
        onPress={handlerSubmitSearch}
      />
    </Container>
  );
};

export default SearchCoinBar;

const Container = styled(View)<{ theme: CustomThemeType }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  margin: 10px;
`;
