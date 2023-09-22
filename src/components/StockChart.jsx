import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from 'recharts';

function StockChart({ data }) {
  const CustomizedCandlestickBar = ({ x, y, width, height, fill }) => {
    return (
      <g>
        <line x1={x + width / 2} y1={y} x2={x + width / 2} y2={y + height} stroke={fill} />
        <rect x={x} y={y} width={width} height={height} fill={fill} />
      </g>
    );
  };

  return (
    <ComposedChart
      width={600}
      height={400}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <XAxis dataKey="updatedAt" />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey="open"
        shape={<CustomizedCandlestickBar />}
        data={data.map(entry => ({
          ...entry,
          fill: entry.open > entry.close ? "#f00" : "#0f0",
          topY: Math.max(entry.open, entry.close),
          bottomY: Math.min(entry.open, entry.close),
          height: Math.abs(entry.close - entry.open)
        }))}
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    </ComposedChart>
  );
}

export default StockChart;
