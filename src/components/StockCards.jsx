import StockCard from "./StockCard";
import { Box } from "@mui/material";

function StockCards({ stocks }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      {stocks.map((stock) => (
        <StockCard stock={stock} />
      ))}
    </Box>
  );
}

export default StockCards;
