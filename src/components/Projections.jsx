import { useAuth0 } from "@auth0/auth0-react";
import RegressionCards from "./ProjectionCards.jsx";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

function UserRegressionRequests({ userId }) {
  const [regressionRequests, setRegressionRequests] = useState([]);
  const [currentValues, setCurrentValues] = useState({});
  const { user } = useAuth0();

  async function fetchRegressionRequests() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getAllRegressions/${user.sub}`);
      const data = await response.json();
      console.log(data.jobIds)
  
      if (!data.jobIds || !Array.isArray(data.jobIds)) {
        console.error("Unexpected data format from /getAllRegressions:", data);
        return;
      }
  
      const regressionDetails = await Promise.all(
        data.jobIds.map(async jobId => {
          try {
            const detailResponse = await fetch(`${import.meta.env.VITE_API_URL}/getRegressionResult/${jobId}`);
            if (!detailResponse.ok) {
              console.error(`Error fetching details for jobId ${jobId}:`, detailResponse.statusText);
              return null;
            }
            return await detailResponse.json();
          } catch (error) {
            console.error(`Error fetching details for jobId ${jobId}:`, error);
            return null;
          }
        })
      );
  
      const validDetails = regressionDetails.filter(detail => detail !== null);
      setRegressionRequests(validDetails);
  
      // Fetch current stock values for each regression request
      for (let req of validDetails) {
        const currentData = await fetch(`${import.meta.env.VITE_API_URL}/stocks/${req.symbol}?size=1`);
        const currentValue = await currentData.json();
        setCurrentValues(prevState => ({ ...prevState, [req.jobId]: currentValue[0]?.price }));
      }
    } catch (error) {
      console.error("Error fetching regressions:", error);
      setRegressionRequests([]);
    }
  }
  

  useEffect(() => {
    fetchRegressionRequests();
  }, [userId, user.sub]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <RegressionCards requests={regressionRequests} currentValues={currentValues}></RegressionCards>
    </Box>
  );
}

export default UserRegressionRequests;
