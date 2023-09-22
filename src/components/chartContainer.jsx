import StockChart from './StockChart.jsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HOUR = 3600000;
const DAY = 24 * HOUR;
const MIN_20 = 20 * 60 * 1000;

const ChartContainer = () => {
    const { symbol } = useParams();
    const [chartType, setChartType] = useState('7days');
    const [chartData, setChartData] = useState({});
    const [apiData, setApiData] = useState({});
    const [loading, setLoading] = useState(true);

    // Worker instances
    const workers = {
        '7days': new Worker('./chartWorker.jsx'),
        '90days': new Worker('./chartWorker.jsx'),
        '24hours': new Worker('./chartWorker.jsx')
    };

    
    Object.keys(workers).forEach(type => {
        workers[type].onmessage = function(e) {
            const aggregatedData = e.data;
            setChartData(prevState => ({ ...prevState, [type]: aggregatedData }));
        };
    });

    useEffect(() => {
        async function fetchData(type) {
            const currentDate = new Date();
            let targetDate;

            switch (type) {
                case '7days':
                    targetDate = new Date(currentDate - 7 * DAY);
                    break;
                case '90days':
                    targetDate = new Date(currentDate - 90 * DAY);
                    break;
                case '24hours':
                default:
                    targetDate = new Date(currentDate - 24 * HOUR);
            }

            const response = await fetch(`http://localhost:3000/stocks/${symbol}?date=${targetDate.toISOString()}`);
            // Habria que revisar si hay que manejar la paginacion igual al usar el parametro date de la API
            const data = await response.json();
            setApiData(prevState => ({ ...prevState, [type]: data }));
        }

        fetchData('7days');
        fetchData('90days');
        fetchData('24hours');
    }, []);

    useEffect(() => {
        if (apiData['7days']) {
            workers['7days'].postMessage({ data: apiData['7days'], interval: HOUR });
            setLoading(false); 
        }
        if (apiData['90days']) {
            workers['90days'].postMessage({ data: apiData['90days'], interval: DAY });

        }
        if (apiData['24hours']) {
            workers['24hours'].postMessage({ data: apiData['24hours'], interval: MIN_20 });
        }
    }, [apiData]);

    return (
        <div>
            <select value={chartType} onChange={e => setChartType(e.target.value)}>
                <option value="7days">Last 7 days</option>
                <option value="90days">Last 90 days</option>
                <option value="24hours">Last 24 hours</option>
            </select>
    
            {loading ? (
                <p>Loading...</p>
            ) : (
                <StockChart data={chartData[chartType]} />
            )}
        </div>
    );
}

export default ChartContainer;
