import './chartContainer.css';  // import the CSS
import StockChart from './StockChart.jsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Modal, Box } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth0 } from '@auth0/auth0-react';

const ChartContainer = () => {
    const {user} = useAuth0();
    const { symbol } = useParams();
    const [chartType, setChartType] = useState('7days');
    const [chartData, setChartData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState({
        '24hours': true,
        '7days': true,
        '90days': true
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [selectedDate, setSelectedDate] = useState(null);
    const [generatePredictionEnabled, setGeneratePredictionEnabled] = useState(false);


    // Chart types
    const chartConfig = {
        '24hours': { chartSpanDays: 1, candleSpanMins: 20 },
        '7days': { chartSpanDays: 7, candleSpanMins: 60 },
        '90days': { chartSpanDays: 90, candleSpanMins: 60*24 }
    };

    const sendProjectionRequest = async (symbol) => {
        const response = await fetch(`${import.meta.env.VITE_API_GATEWAY_URL}/requestProjection/${symbol}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: user.sub,
              date: selectedDate,
            }),
          });
        console.log(response);
    }

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
            <div className="chart-container-wrapper">
                <div className="chart-btn-container">
                    <button className="chart-title-btn" onClick={openModal}>
                        Generar predicción
                    </button>
                </div>
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
            </div>

            <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 450, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                    <div className="date-input-container">
                        <p>Ingresa la fecha deseada:</p>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => {
                                setSelectedDate(date);
                                setGeneratePredictionEnabled(true);
                                console.log("Fecha seleccionada:", date);
                            }}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Selecciona una fecha"
                            className="date-picker"
                        />
                    </div>
                    <div className="modal-button-container">
                        <Button
                            className="modal-button"
                            disabled={!generatePredictionEnabled} // Deshabilitado hasta que se seleccione una fecha.
                            variant="contained"
                            color="primary"
                            onClick={() => {sendProjectionRequest(symbol)}}
                        >
                            Generar Predicción
                        </Button>
                        <Button className="modal-button" onClick={closeModal}>Cerrar</Button>
                    </div>
                </Box>
            </Modal>




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
