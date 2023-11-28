import { useEffect, useState } from "react";
import Proposal from "./Proposal";
import { Box } from "@mui/material";
import { Button } from "@mui/material";

function Offers({ type, buttonName, callback }) {
  const [auctions, setAuctions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const pageSize = 25;
  
  useEffect(() => {
    const fetchAuctionsFromApi = async () => {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/auctions/${type}?page=${currentPage}&size=${pageSize}`);
      const jsonData = await data.json();
    
      if (jsonData.length < pageSize) {
        setHasMorePages(false);
      } else {
        setHasMorePages(true);
      }
      setAuctions(jsonData);
    };
    fetchAuctionsFromApi();
  }, [type, currentPage]);

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
      <Proposal auctions={auctions} buttonName={buttonName} callback={callback}></Proposal>
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

export default Offers;