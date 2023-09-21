import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Rectangle,
} from 'recharts';

function StockChart({ data }) {// esto es inusable por el momento. Hay que integrar bien los chartWorkers
  const barWidth = 20;

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

      {data.map((entry, index) => {
        const fill = entry.open > entry.close ? "#f00" : "#0f0";
        const topY = Math.max(entry.open, entry.close);
        const bottomY = Math.min(entry.open, entry.close);

        return (
          <g key={`candlestick-${index}`}>
            <ReferenceLine
              x={entry.updatedAt}
              stroke={fill}
              y={entry.high}
              yAxisId={0}
              alwaysShow
            />
            <ReferenceLine
              x={entry.updatedAt}
              stroke={fill}
              y={entry.low}
              yAxisId={0}
              alwaysShow
            />
            <Rectangle
              x={index * barWidth + 6}
              y={topY}
              width={barWidth}
              height={topY - bottomY}
              fill={fill}
            />
          </g>
        );
      })}

      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    </ComposedChart>
  );
}

export default StockChart;

// To do: SetTimeScale
// Mostrar datos como un open/close del periodo que representa cada punto en vez de solo un punto por medicion
// por ejemplo si un usuario quiere ver los ultimos 30 dias, con una medicion por dia, en lugar de mostrar un valor para cada dia, mostrar
// una vela de apertura y cierre del dia, y quiza un punto promedio
// Estaba revisando como hacer esto y se me fue la hora xd 

