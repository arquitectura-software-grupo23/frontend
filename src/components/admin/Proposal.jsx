import React from "react";
import { useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Proposals({ auctions, buttonName, callback }) {
  const stocks = [];
  console.log(auctions, buttonName, callback);
  return(
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Auction ID</TableCell>
              <TableCell align="right">Proposal ID</TableCell>
              <TableCell align="right">Stock ID</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Group ID</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auctions.map((auction) => (
              <TableRow key={auction.updatedAt}>
                <TableCell align="right">{auction.auction_id}</TableCell>
                <TableCell align="right">{auction.proposal_id}</TableCell>
                <TableCell align="right">{auction.stock_id}</TableCell>
                <TableCell align="right">{auction.quantity}</TableCell>
                <TableCell align="right">{auction.group_id}</TableCell>
                <TableCell align="right">{auction.type}</TableCell>
                <TableCell align="right">
                  {new Date(auction.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {<Button onClick={() => callback(auction)}>{buttonName}</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}