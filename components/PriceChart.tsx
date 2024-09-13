import { mockCoinData } from "@/constants/coinDataMock";
import { CustomThemeType } from "@/themes/themes";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { LineChart } from "react-native-wagmi-charts";

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
      <Text style={{ ...styles.info, color: theme.colors.text }}>
        Coin chart
      </Text>
      <LineChart.DatetimeText
        style={{ ...styles.dateTime, color: theme.colors.text }}
        options={options}
      />
      <LineChart.PriceText
        format={({ value }) => {
          "worklet";
          return value && `$${value}`;
        }}
        style={{ ...styles.price, color: theme.colors.text }}
        variant="formatted"
      />
      <LineChart>
        <LineChart.Path color="#8f1d43" />
        <LineChart.CursorCrosshair color="hotpink" />
      </LineChart>
    </LineChart.Provider>
  );
};

const styles = StyleSheet.create({
  info: {
    fontSize: 20,
    marginBottom: 20,
  },
  dateTime: {
    fontSize: 20,
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
