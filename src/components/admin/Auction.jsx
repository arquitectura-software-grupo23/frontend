import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Offers from "./Offers"

async function MakePropose(auction)
{
  const bodyAuction = {
    auction_id: auction.auction_id,
    stock_id: auction.stock_id,
    quantity: auction.quantity,
    type: 'proposal',
    proposal_id: 'new'
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyAuction)
  };
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/auctions/create`, requestOptions);
  } catch (error) {
    console.error('There was an error!', error);
  }
}

async function AcceptPropose(auction)
{
  const bodyAuction = {
    auction_id: auction.auction_id,
    stock_id: auction.stock_id,
    quantity: auction.quantity,
    type: 'acceptance',
    proposal_id: auction.proposal_id,
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyAuction)
  };
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/auctions/create`, requestOptions);
  } catch (error) {
    console.error('There was an error!', error);
  }
}






function CustomTabPanel(props) {
  const { value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value == 0 && (
        <Offers type={"offer"} buttonName="Propose" callback={MakePropose}/> 
      )}
      {value == 1 && (
        <Offers type={"proposal"} buttonName="Accept" callback={AcceptPropose}/>
      )}
      {value == 2 && (
        <Offers type={"history"} buttonName="" callback={()=>{}}/>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Offers" {...a11yProps(0)} />
          <Tab label="Proposals" {...a11yProps(1)} />
          <Tab label="History" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}/>
      <CustomTabPanel value={value} index={1}/>
      <CustomTabPanel value={value} index={2}/>
    </Box>
  );
}