import { Chart } from "react-google-charts";

function formatDateWithMinutes(timestamp) {
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
}

function StockChart({ data }) {
    // Convert the API data to Google Charts format
    const transformedData = [
        ['Date', 'Low', 'Opening Value', 'Closing Value', 'High'],
        ...data.map(entry => [
            formatDateWithMinutes(entry.candleTimeStamp),
            entry.low,
            entry.open,
            entry.close,
            entry.high,
        ]),
    ];

    const options = {
      backgroundColor: '#333', // Dark background
      legend: 'none',
      
      hAxis: {
          title: 'Date',
          textStyle: {
              color: '#FFF', // White text
          },
          titleTextStyle: {
              color: '#FFF', // White title text
          },
          baselineColor: '#666', // Color for the baseline
          gridlines: {
              color: '#444', // Gridline color
          },
      },
      vAxis: {
          title: 'Stock Price',
          textStyle: {
              color: '#FFF', // White text
          },
          titleTextStyle: {
              color: '#FFF', // White title text
          },
          baselineColor: '#666', // Color for the baseline
          gridlines: {
              color: '#444', // Gridline color
          },
      },
      candlestick: {
          fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
          risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
      }
  };
  

    return (
        <Chart
            chartType="CandlestickChart"
            width="100%"
            height="400px"
            data={transformedData}
            options={options}
        />
    );
}

export default StockChart;
