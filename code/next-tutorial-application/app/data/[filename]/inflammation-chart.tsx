"use client"

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export type DailyStats = {
  day: number
  average: number
  max: number
  min: number
}

const SERIES = [
  { key: "max", name: "Max", color: "var(--chart-series-max)" },
  { key: "average", name: "Average", color: "var(--chart-series-average)" },
  { key: "min", name: "Min", color: "var(--chart-series-min)" },
] as const

function endLabel(color: string, name: string, dataLength: number) {
  return (props: any) => {
    const { x, y, index } = props
    if (index !== dataLength - 1) {
      return <g key={`end-label-${name}`} />
    }
    return (
      <g key={`end-label-${name}`}>
        <circle cx={x} cy={y} r={4} fill={color} stroke="var(--background)" strokeWidth={2} />
        <text x={x + 8} y={y} dy={4} fontSize={12} fill="var(--foreground)">
          {name}
        </text>
      </g>
    )
  }
}

export default function InflammationChart({ data }: { data: DailyStats[] }) {
  return (
    <div className="w-full h-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 56, bottom: 8, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
          <XAxis
            dataKey="day"
            stroke="var(--chart-axis)"
            tick={{ fill: "var(--chart-muted)", fontSize: 12 }}
            label={{ value: "Day", position: "insideBottom", offset: -4, fill: "var(--chart-muted)", fontSize: 12 }}
          />
          <YAxis
            stroke="var(--chart-axis)"
            tick={{ fill: "var(--chart-muted)", fontSize: 12 }}
            label={{ value: "Inflammation", angle: -90, position: "insideLeft", fill: "var(--chart-muted)", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ stroke: "var(--chart-axis)", strokeWidth: 1 }}
            contentStyle={{ background: "var(--background)", border: "1px solid var(--chart-grid)" }}
            labelStyle={{ color: "var(--foreground)" }}
          />
          <Legend wrapperStyle={{ color: "var(--foreground)", fontSize: 12 }} />
          {SERIES.map((series) => (
            <Line
              key={series.key}
              type="monotone"
              dataKey={series.key}
              name={series.name}
              stroke={series.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: series.color, stroke: "var(--background)", strokeWidth: 2 }}
              label={endLabel(series.color, series.name, data.length)}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
