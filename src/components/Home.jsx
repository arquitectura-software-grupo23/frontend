import { useEffect, useState } from "react";
import StockCards from "./StockCards";
import { Box } from "@mui/material";

function Home() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocksFromApi = async () => {
      let data;
      try {
        data = await fetch(`${import.meta.env.VITE_API_URL}/stocks`)
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
    </Box>
  );
}

export default Home;
