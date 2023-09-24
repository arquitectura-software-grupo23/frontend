import './chartContainer.css';  // import the CSS
import StockChart from './StockChart.jsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ChartContainer = () => {
    const { symbol } = useParams();
    const [chartType, setChartType] = useState('7days');
    const [chartData, setChartData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState({
        '24hours': true,
        '7days': true,
        '90days': true
    });

    // Chart types
    const chartConfig = {
        '24hours': { chartSpanDays: 1, candleSpanMins: 20 },
        '7days': { chartSpanDays: 7, candleSpanMins: 60 },
        '90days': { chartSpanDays: 90, candleSpanMins: 60*24 }
    };

    useEffect(() => {
        const fetchDataFromAPI = async (symbol, chartSpanDays, candleSpanMins) => {
            const url = `${import.meta.env.VITE_API_URL}/candlestick/${symbol}?chartSpanDays=${chartSpanDays}&candleSpanMins=${candleSpanMins}`;
            try {
                const response = await fetch(url);
                const responseData = await response.json();
                return responseData;
            } catch (error) {
                console.error("Error fetching data from API:", error);
                return { error: "Error fetching data from API." };
            }
        };

        const fetchData = async () => {
            const { chartSpanDays, candleSpanMins } = chartConfig[chartType];
            const { data: fetchedData, error } = await fetchDataFromAPI(symbol, chartSpanDays, candleSpanMins);
            if (error) {
                setError(error);
            } else {
                setChartData(prevState => ({ ...prevState, [chartType]: fetchedData }));
            }
            setLoading(prevLoading => ({ ...prevLoading, [chartType]: false }));
        };

        fetchData();
    }, [chartType, symbol]);

    return (
        <div>
            <div className="chart-option-container">
                <button 
                    className={`chart-option-btn ${chartType === '24hours' && 'active'}`}
                    onClick={() => setChartType('24hours')}
                >
                    Last 24 hours
                </button>
                <button 
                    className={`chart-option-btn ${chartType === '7days' && 'active'}`}
                    onClick={() => setChartType('7days')}
                >
                    Last 7 days
                </button>
                <button 
                    className={`chart-option-btn ${chartType === '90days' && 'active'}`}
                    onClick={() => setChartType('90days')}
                >
                    Last 90 days
                </button>
            </div>

            {error ? (
                <p>Error: {error}</p>
            ) : loading[chartType] ? (
                <p>Loading...</p>
            ) : (
                <StockChart data={chartData[chartType]} />
            )}
        </div>
    );  
}

export default ChartContainer;
