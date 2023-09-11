import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function minutesSince(updatedAt) {
  const now = new Date();
  const updateDate = new Date(updatedAt);
  const differenceInMilliseconds = now - updateDate;
  return Math.floor(differenceInMilliseconds / 1000 / 60);
}

function StockCard({ stock }) {
  return (
    <Card key={stock.symbol} style={{ margin: 20, width: 300 }}>
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
    </Card>
  );
}

export default StockCard;
