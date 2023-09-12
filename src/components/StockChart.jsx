import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function StockChart({ data }) {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="updatedAt" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}
// To do: SetTimeScale
// Mostrar datos como un open/close del periodo que representa cada punto en vez de solo un punto por medicion
// por ejemplo si un usuario quiere ver los ultimos 30 dias, con una medicion por dia, en lugar de mostrar un valor para cada dia, mostrar
// una vela de apertura y cierre del dia, y quiza un punto promedio
// Estaba revisando como hacer esto y se me fue la hora xd 
export default StockChart;

