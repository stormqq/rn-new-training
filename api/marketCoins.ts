import { CoinMarkets } from "@/types/coinMarkets";
import axios from "axios";
import { useQuery } from "react-query";

export const getAllMarketCoins = async () => {
  const res = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        x_cg_demo_api_key: "CG-pFp7tznF5yYEEoxAZR27vtu7",
      },
    }
  );

  return res.data;
};

export const useMarketCoins = () => {
  return useQuery({
    queryKey: ["marketCoins"],
    queryFn: getAllMarketCoins,
  });
};
