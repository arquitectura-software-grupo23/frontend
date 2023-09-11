import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

function StockTable({ stocks }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell align="right">Currency</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Short Name</TableCell>
            <TableCell align="right">Source</TableCell>
            <TableCell align="right">Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.symbol}>
              <TableCell component="th" scope="row">
                {stock.symbol}
              </TableCell>
              <TableCell align="right">{stock.currency}</TableCell>
              <TableCell align="right">{stock.price}</TableCell>
              <TableCell align="right">{stock.shortName}</TableCell>
              <TableCell align="right">{stock.source}</TableCell>
              <TableCell align="right">
                {new Date(stock.updatedAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StockTable;
