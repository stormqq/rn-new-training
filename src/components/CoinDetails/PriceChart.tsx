import { mockCoinData } from "@/src/constants/coinDataMock";
import { CustomThemeType } from "@/src/themes/themes";
import { Text, useTheme } from "react-native-paper";
import { LineChart } from "react-native-wagmi-charts";
import styled from "styled-components/native";

type PriceChartProps = {
  data: typeof mockCoinData;
};

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export const CoinPriceChart = ({ data }: PriceChartProps) => {
  const theme: CustomThemeType = useTheme();

  return (
    <LineChart.Provider data={data}>
      <StyledInfo theme={theme}>Coin chart</StyledInfo>
      <StyledDateTimeText theme={theme} options={options} />
      <StyledPriceText
        theme={theme}
        format={({ value }) => {
          "worklet";
          return value && `$${value}`;
        }}
        variant="formatted"
      />
      <LineChart>
        <LineChart.Path color="#8f1d43" />
        <LineChart.CursorCrosshair color="hotpink" />
      </LineChart>
    </LineChart.Provider>
  );
};

const StyledInfo = styled(Text)<{ theme: CustomThemeType }>`
  font-size: 20px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.text};
`;

const StyledDateTimeText = styled(LineChart.DatetimeText)<{
  theme: CustomThemeType;
}>`
  font-size: 20px;
  color: ${(props) => props.theme.colors.text};
`;

const StyledPriceText = styled(LineChart.PriceText)<{ theme: CustomThemeType }>`
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
`;
