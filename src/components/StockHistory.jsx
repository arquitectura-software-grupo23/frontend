import { useEffect, useState } from "react";
import StocksTable from "./StocksTable";
import { Box } from "@mui/material";
import { useParams } from 'react-router-dom';

function Home() {
  const {symbol} = useParams()
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocksFromApi = async () => {
      const data = await fetch(`http://localhost:3000/stocks/${symbol}`);
      setStocks(await data.json());
    };
    fetchStocksFromApi();
  }, [symbol]);
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <StocksTable stocks={stocks}></StocksTable>
    </Box>
  );
}

export default Home;
