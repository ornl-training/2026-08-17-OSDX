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

export type Dataset = {
  columns: number[]
  index: number[]
  data: number[][]
}

export type DailyStats = {
  day: number
  average: number
  max: number
  min: number
}

function toDailyStats(dataset: Dataset): DailyStats[] {
  return dataset.columns.map((day, columnIndex) => {
    const values = dataset.data.map((row) => row[columnIndex])
    return {
      day,
      average: values.reduce((sum, value) => sum + value, 0) / values.length,
      max: Math.max(...values),
      min: Math.min(...values),
    }
  })
}

export function InflammationChart({ data }: { data: Dataset }) {
  	const stats = toDailyStats(data)

  	return (
		<ResponsiveContainer className="flex-1" width="100%" height="100%">
			<LineChart data={stats}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="day"
					label={{ value: "Day", position: "insideBottom" }}
				/>
				<YAxis
					label={{ value: "Inflammation", angle: -90, position: "insideLeft" }}
				/>
				<Legend />
				<Tooltip />
				<Line type="monotone" dataKey="average" stroke="#007833" />
				<Line type="monotone" dataKey="max" stroke="red" />
				<Line type="monotone" dataKey="min" stroke="blue" />
			</LineChart>
		</ResponsiveContainer>
	);
}
