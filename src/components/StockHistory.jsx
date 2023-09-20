import { useEffect, useState } from "react";
import StocksTable from "./StocksTable";
import { Box } from "@mui/material";
import { useParams } from 'react-router-dom';
import { Button } from "@mui/material";

function StockHistory() {
  const {symbol} = useParams()
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25; 
  const [hasMorePages, setHasMorePages] = useState(true);
  
  useEffect(() => {
    const fetchStocksFromApi = async () => {
      const data = await fetch(`http://localhost:3000/stocks/${symbol}?page=${currentPage}&size=${pageSize}`);
      const jsonData = await data.json();
    
      if (jsonData.length < pageSize) {
        setHasMorePages(false);
      } else {
        setHasMorePages(true);
      }
      setStocks(jsonData);
    };
    fetchStocksFromApi();
  }, [symbol, currentPage]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  }

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  }
  
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
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        gap: "10px",
      }}
      >
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</Button>
        <Button onClick={handleNextPage} disabled={!hasMorePages}>Siguiente</Button>
      </Box>
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
      >
       Página {currentPage}{!hasMorePages && currentPage > 1 ? ` (Última página)` : ''}
      </Box>
    </Box>
  );

}


export default StockHistory;
