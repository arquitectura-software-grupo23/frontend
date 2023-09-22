import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShowChartIcon from '@mui/icons-material/ShowChart'; 
import { useEffect, useState } from "react";


function minutesSince(updatedAt) {
  const now = new Date();
  const updateDate = new Date(updatedAt);
  const differenceInMilliseconds = now - updateDate;
  return Math.floor(differenceInMilliseconds / 1000 / 60);
}

function StockCard({ stock }) {
  const buyStocks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            group_id: "23",
            symbol: stock.symbol,
            deposit_token: "",
            quantity: 1,
            seller: 0,
            user_id: "test"
        }),
      });

      if (response.ok) {
        console.log('Solicitud exitosa');
      } else {
        console.error('Error al realizar la solicitud');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <Card  key={stock.symbol} style={{ margin: 20, width: 300 }}>
      <Link to={stock.symbol} key={stock.shortName} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5" component="div">
              {stock.symbol}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" noWrap={true}>
              {stock.shortName}
            </Typography>
            <Typography variant="body1" style={{ color: "lightgreen" }}>
              {stock.price} {stock.currency}
            </Typography>
            <Typography variant="body1">
              <br /> Updated {minutesSince(stock.updatedAt)} minutes ago
            </Typography>
            <Typography variant="subtitle2">Source: {stock.source}</Typography>
            <Typography variant="subtitle2">
              {new Date(stock.updatedAt).toLocaleString()}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <div>
        <Link to={`/chart/${stock.symbol}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <Button  
            sx={{ 
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              opacity: 0.5,
              '&:hover': { backgroundColor: 'lightgrey' },
              borderRadius: 0
            }} 
            component="label" 
            variant="contained" 
            startIcon={<ShowChartIcon />}
            style={{ width: '100%'}}
          >
            Grafico
          </Button>
        </Link>
      </div>
      <div>
        <Link to={`/profile`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <Button  sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'lightgreen' }, borderRadius: 0 }} component="label" variant="contained" startIcon={<ShoppingCartIcon />} style={{ width: '100%'}} onClick={buyStocks}>
            Comprar stocks
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default StockCard;
