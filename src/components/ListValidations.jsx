import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function ListValidations({ requests }) {
 
requests.forEach(element => {
  console.log(element, element.validations)
});

  return (
    <List style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '16px' }}>
      <Divider />
      {requests ? (
        requests.map((request, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography component="span" variant="body1" color="black">
                    {request.symbol} {request.quantity}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="black">
                      {request.createdAt} {request.user_location}
                    </Typography>
                    {request?.validations[0]?.valid
                     &&(<a href={`https://voucher-g23.s3.amazonaws.com/grupo23-${request.deposit_token}`} target="_blank" rel="noopener noreferrer"> BOLETA</a>)}
                  </>
                }
                
              />
            </ListItem>

          </React.Fragment>
        ))
      ) : (
        <ListItem>
          <ListItemText primary="No hay solicitudes disponibles" />
        </ListItem>
      )}
    </List>
  );
}

export default ListValidations;
