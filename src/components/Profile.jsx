import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.css";
import PaidIcon from '@mui/icons-material/Paid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [open, setOpen] = React.useState(false);
  const [showCompras, setShowCompras] = React.useState(false);
  const [comprasButtonLabel, setComprasButtonLabel] = React.useState("Mostrar compras");
  const [dinero, setDinero] = React.useState(100);
  const emojiDinero = "💰";

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleComprasClick = () => {
    if (showCompras) {
      setShowCompras(false);
      setComprasButtonLabel("Mostrar compras");
    } else {
      setShowCompras(true);
      setComprasButtonLabel("Ocultar compras");
    }
  };

  const handleAgregarDinero = () => {
    const nuevoSaldo = dinero + 50; // Sumar $50 al saldo actual
    setDinero(nuevoSaldo); // Actualizar la variable "dinero" con el nuevo saldo
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-background">
            <img
              src="https://e1.pxfuel.com/desktop-wallpaper/127/84/desktop-wallpaper-dark-mode-dark-mode-phone.jpg"
              alt="Background"
            />
          </div>
          <div className="profile-info">
            <div className="profile-image">
              <img src={user.picture} alt={user.name} />
            </div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div style={{ display: 'flex' }}>
              <Button sx={{ color: 'primary.main' }} className="MuiButton-textPrimary" style={{ marginRight: '10px' }} onClick={handleOpen}>Billetera</Button>
              <Button sx={{ color: 'primary.main' }} style={{ marginLeft: '10px' }} onClick={handleComprasClick}>{comprasButtonLabel}</Button>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Dinero disponible
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Tu saldo actual es de: {emojiDinero}${dinero}
                </Typography>
                <Button variant="contained" color="success" style={{ marginTop: '20px' }} onClick={handleAgregarDinero}>
                  Obtener más dinero
                </Button>
              </Box>
            </Modal>
          </div>
        </div>
        
        {showCompras && (
          <div className="compras-container">
          <div className="compras-card">
            <div className="compras-column">
              <h3>Compras exitosas</h3>
              {/* Add content for successful purchases */}
            </div>
          </div>
          <div className="compras-card">
            <div className="compras-column">
              <h3>Compras pendientes</h3>
              {/* Add content for pending purchases */}
            </div>
          </div>
        </div>
        )}
      </div>
    )
  );
};

export default Profile;
