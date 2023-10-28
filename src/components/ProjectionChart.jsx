import './chartContainer.css'; // reuse the CSS
import StockChart from './StockChart.jsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProjectionChart = () => {
    const { jobId } = useParams();
    const [chartData, setChartData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegressionData = async (jobId) => {
            const url = `${import.meta.env.VITE_API_URL}/regressioncandle/${jobId}`;
            try {
                const response = await fetch(url);
                const responseData = await response.json();
                setChartData(responseData.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching regression data:", error);
                setError("Error fetching regression data.");
                setLoading(false);
            }
        };

        fetchRegressionData(jobId);
    }, [jobId]);

    return (
        <div className="chart-container-wrapper">
            <button 
                        className={`chart-option-btn ${'active'}`}
                        // onClick={() => setChartType('7days')}
                    >
                        Buy Stock
                    </button>
            {error ? (
                <p>Error: {error}</p>
            ) : loading ? (
                <p>Loading...</p>
            ) : (
                <StockChart data={chartData} />
            )}
        </div>
    );
}

export default ProjectionChart;
