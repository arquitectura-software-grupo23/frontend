self.addEventListener('message', async (event) => {
  const { action, symbol, chartSpanDays, candleSpanMins } = event.data;

  if (action === 'fetch') {
      const data = await fetchDataFromAPI(symbol, chartSpanDays, candleSpanMins);
      // Return data back to the main thread
      self.postMessage(data);
  }
});

async function fetchDataFromAPI(symbol, chartSpanDays, candleSpanMins) {
  // Construct the API endpoint URL based on the passed parameters. 
  const url = `https://api.stocknet.me/candlestick/${symbol}?chartSpanDays=${chartSpanDays}&candleSpanMins=${candleSpanMins}`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching data from API:", error);
      // Handle errors as you see fit
      self.postMessage({ error: "Error fetching data from API." });
  }
}
