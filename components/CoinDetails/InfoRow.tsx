import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native-paper";
import { View } from "react-native";

type CoinInfoRowProps = {
  label: string;
  value: string | number;
};

export const CoinInfoRow = ({ label, value }: CoinInfoRowProps) => (
  <InfoRow>
    <InfoText>{label}</InfoText>
    <Text variant="titleMedium">{value}</Text>
  </InfoRow>
);

const InfoRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const InfoText = styled(Text)`
  color: #9e9e9e;
`;
