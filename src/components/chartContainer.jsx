import StockChart from './StockChart.jsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect , useMemo} from 'react';

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

    // Worker instances
    const workers = useMemo(() => ({
        '24hours': new Worker('./chartWorker.jsx'),
        '7days': new Worker('./chartWorker.jsx'),
        '90days': new Worker('./chartWorker.jsx')
    }),[]);

    Object.keys(workers).forEach(type => {
        workers[type].onmessage = function(e) {
            if (e.data.error) {
                setError(e.data.error);
                setLoading(prevLoading => ({ ...prevLoading, [type]: false }));
            } else {
                const aggregatedData = e.data;
                setChartData(prevState => ({ ...prevState, [type]: aggregatedData }));
                setLoading(prevLoading => ({ ...prevLoading, [type]: false }));
            }
        };

        // Initiate fetch in worker right away
        const { chartSpanDays, candleSpanMins } = chartConfig[type];
        workers[type].postMessage({
            action: 'fetch',
            symbol: symbol,
            chartSpanDays: chartSpanDays,
            candleSpanMins: candleSpanMins,
        });
    });

    useEffect(() => {
        // Cleanup workers
        return () => {
            Object.values(workers).forEach(worker => worker.terminate());
        };
    }, [workers]);
    

    return (
        <div>
            <select value={chartType} onChange={e => setChartType(e.target.value)}>
                <option value="7days">Last 7 days</option>
                <option value="90days">Last 90 days</option>
                <option value="24hours">Last 24 hours</option>
            </select>

            {error? (
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
