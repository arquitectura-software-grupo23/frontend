import { useEffect, useState } from "react";
import StockCards from "./StockCards";
import { Box } from "@mui/material";

function Home() {
  const [stocks, setStocks] = useState([]);
  const [groupStocks, setGroupStocks] = useState([]);
  const [availableStocks, setAvailableStocks] = useState([]);

  useEffect(() => {
    const fetchStocksFromApi = async () => {
      let data; //each stock has a symbol
      try {
        data = await fetch(`${import.meta.env.VITE_API_URL}/stocks`)
        data = await data.json();
      } catch (error) {
        data = [];
      }

      setStocks(data);
    };
  
    const fetchGroupStocks = async () => {
      let data; //each stock has a symbol
      try {
        data = await fetch(`${import.meta.env.VITE_API_URL}/groupstock`)
        data = await data.json();
      } catch (error) {
        data = [];
      }
      console.log(data);
      setGroupStocks(data);
    };

    fetchStocksFromApi();
    fetchGroupStocks();
  }, []);

  useEffect(() => {
    if(stocks && groupStocks){
      const stocksWithAvailability = stocks.map((stock) => {
        const quantity = groupStocks.find((groupStock) => groupStock.symbol === stock.symbol)?.amount;
        return {
          ...stock,
          quantity: quantity ? quantity : 0,
        };
      });
      setAvailableStocks(stocksWithAvailability);
    }
  }, [stocks, groupStocks]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <StockCards stocks={availableStocks}></StockCards>
    </Box>
  );
}

export default Home;
