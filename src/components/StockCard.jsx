import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useAuth0 } from "@auth0/auth0-react";
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import { useUser } from "../contexts/UserContext";


function minutesSince(updatedAt) {
  const now = new Date();
  const updateDate = new Date(updatedAt);
  const differenceInMilliseconds = now - updateDate;
  return Math.floor(differenceInMilliseconds / 1000 / 60);
}

function StockCard({ stock }) {
  const [isBuyStockModalOpen, setIsBuyStockModalOpen] = useState(false);
  const { user, isAuthenticated, getAccessTokenSilently  } = useAuth0();
  const [cantidad, setCantidad] = useState(""); // Nuevo estado para la cantidad
  const { isAdmin } = useUser();
  
  const handleBuyStockModalOpen = () => {
    setIsBuyStockModalOpen(true);
  };

  const handleBuyStockModalClose = () => {
    setIsBuyStockModalOpen(false);
  };

  const handleComprarClick = () => {
    buyStocks();
    console.log("Cantidad a comprar:", cantidad);
  };

  const buyStocks = async () => {
    if(isAdmin){
      adminPurchase('0', cantidad);
    } else {
      normalPurchase('23', cantidad);
    }
  };

  const adminPurchase = async (seller, quantity) => {
    try {
      console.log("Admin");
      const ipDataResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipDataResponse.json();

      const cityDataResponse = await fetch(`https://ipapi.co/${ipData.ip}/json`)
      const cityData = await cityDataResponse.json();

      const jwtoken = await getAccessTokenSilently();
      
      const response = await fetch(`${import.meta.env.VITE_API_GATEWAY_URL}/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtoken}`,
        },
        body: JSON.stringify({
            symbol: stock.symbol,
            quantity: quantity,
            user_id: user.sub,
            user_ip: ipData.ip,
            user_location: cityData.cit,
            seller
        }),
      });

      if (response.ok) {
        console.log('Se ha recibido webpay token');
        const responseData = await response.json();
        const token = responseData.token;
        const url = responseData.url;
        
        // Redireccionar a la URL con el token recibido
        window.location.href = `${url}?token_ws=${token}`;
      } else {
        console.error('Error al realizar la solicitud');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  const normalPurchase = async () => {
    console.log('Normal purchase');
  }

  return (
    <Card  key={stock.symbol} style={{ margin: 20, width: 300 }}>
      <Link to={"table/"+stock.symbol} key={stock.shortName} style={{ textDecoration: 'none', color: 'inherit' }}>
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
        {isAuthenticated&&
        <Button  sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'lightgreen' }, borderRadius: 0 }} 
          component="label" variant="contained" startIcon={<ShoppingCartIcon />} 
          style={{ width: '100%'}} onClick={handleBuyStockModalOpen}>
          Comprar stocks
        </Button>}
      </div>

      <Modal
        open={isBuyStockModalOpen}
        onClose={handleBuyStockModalClose}
        aria-labelledby="buy-stock-modal-title"
        aria-describedby="buy-stock-modal-description"
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          border: '2px solid #000',
          borderRadius: '8px',
          color: 'black',
          width: '400px',
          textAlign: 'center',
        }}>
          <h2 id="buy-stock-modal-title">Compra tu stock</h2>
          <p id="buy-stock-modal-description">Ingresa el monto que deseas comprar</p>
          <TextField
            label="Escribe la cantidad"
            type="number"
            variant="outlined"
            style={{ margin: '10px 0', width: '100%' }}
            InputLabelProps={{
              style: { color: 'black' },
            }}
            InputProps={{
              style: { color: 'black' },
            }}
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" onClick={handleComprarClick}>
              Comprar
            </Button>
            <Button variant="contained" onClick={handleBuyStockModalClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}

export default StockCard;
