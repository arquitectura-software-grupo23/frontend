import { useEffect, useState } from "react";
import StockTable from "./StocksTable";
import StockCards from "./StockCards";
import { Box } from "@mui/material";

function Home() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocksFromApi = async () => {
      let data;
      try {
        data = await fetch("http://localhost:3000/stocks")
        data = await data.json()
      } catch (error) {
        data = [];
      }

      setStocks(data);
    };
    fetchStocksFromApi();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <StockCards stocks={stocks}></StockCards>
      {/* <StockTable stocks={stocks}></StockTable> */}
    </Box>
  );
}

export default Home;
