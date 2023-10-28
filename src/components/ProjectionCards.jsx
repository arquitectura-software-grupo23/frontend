import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

function RegressionCards({ requests, currentValues }) {
  const navigate = useNavigate();

  const handleCardClick = (request) => {
    if (
      request.targetProjection &&
      typeof request.targetProjection.value === "number" &&
      request.targetProjection.timestamp
    ) {
      navigate(`/projection/${request.jobId}`);
    } else {
      alert(`No valid projection available for regression: ${request.jobId}`);
    }
  };

  const timestampToDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    return dateObj.toLocaleDateString();
  };

  return (
    <div>
      {requests.map((request, index) => {
        const targetProjection = request.targetProjection;

        const currentValue = currentValues[request.jobId];

        return (
          <Card key={index} sx={{ minWidth: 275, marginBottom: 2 }}>
            <CardActionArea onClick={() => handleCardClick(request)}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Symbol: {request.symbol}
                </Typography>
                {targetProjection && targetProjection.value !== undefined && (
                  <Typography>
                    Projected value: ${targetProjection.value.toFixed(2)} by {timestampToDate(targetProjection.timestamp)} {currentValue && `(current value: $${currentValue.toFixed(2)})`}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </div>
  );
}

export default RegressionCards;
