import { useEffect, useState } from "react";
import Home

function Home() {
  useEffect(() => {
    const fetchStocksFromApi = async () => {
      const data = await fetch("http://localhost:3000/stocks");
      console.log(data);
    };
    fetchStocksFromApi();
  });
  const result = [
    {
      symbol: "AMZN",
      currency: "USD",
      price: 138.23,
      shortName: "Amazon.com, Inc.",
      source: "Nasdaq Real Time Price",
      updatedAt: "2023-09-11T01:01:53.362Z",
    },
    {
      symbol: "TSLA",
      currency: "USD",
      price: 248.5,
      shortName: "Tesla, Inc.",
      source: "Nasdaq Real Time Price",
      updatedAt: "2023-09-11T01:01:53.363Z",
    },
  ];

  return <>test</>;
}

export default Home;
