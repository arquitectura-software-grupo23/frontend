import StockChart from './StockChart.jsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect , useMemo} from 'react';

const ChartContainer = () => {
    const { symbol } = useParams();
    const [chartType, setChartType] = useState('7days');
    const [chartData, setChartData] = useState({});
    const [error, setError] = useState(null);
    const workerModules = import.meta.glob('./chartWorker.js');
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

    // Use a state to hold the worker instances
const [workers, setWorkers] = useState({});

useEffect(() => {
    // Create a local object to hold the workers
    const localWorkers = {};

    // Helper function to create a worker instance
    const createWorkerInstance = async () => {
        const module = await workerModules['./chartWorker.js']();
        const workerInstance = new Worker(new URL(module.default, import.meta.url));
        return workerInstance;
    };

    // Instantiate workers for each type
    const instantiateWorkers = async () => {
        localWorkers['24hours'] = await createWorkerInstance();
        localWorkers['7days'] = await createWorkerInstance();
        localWorkers['90days'] = await createWorkerInstance();
        
        setWorkers(localWorkers); // Update state with new worker instances
    };

    instantiateWorkers();

    // Cleanup workers on component unmount
    return () => {
        Object.values(localWorkers).forEach(worker => worker.terminate());
    };

}, []);

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
