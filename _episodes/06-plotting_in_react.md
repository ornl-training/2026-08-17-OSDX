---
title: "Plotting in React"
teaching: 10
exercises: 0
questions:
	- "How can I plot in React?"
objectives:
  - "Use recharts to display the data retrieved from FastAPI"

---

# Refactoring the InflammationChart component

In the previous episode, we retrieved the contents of a datafile within a dynamic route. To do something with the data, we should update the `InflammationChart` component we created earlier. First, we can refactor the code a bit by updating `components/inflammation-chart.tsx`:

~~~
export type Dataset = {
  columns: number[]
  index: number[]
  data: number[][]
}

export function InflammationChart({ data }: { data: Dataset }) {
	return (
		<div>{JSON.stringify(data, null, 2)}</div>
	);
}
~~~

Then, we can update `app/data/[filename]/page.tsx` to pass the data to the updated component:

~~~
import { Dataset, InflammationChart } from '../../../components/inflammation-chart';

async function getDataset(filename: string): Promise<Dataset | null> {
  const response = await fetch(`http://localhost:8000/data/${filename}`)

  if (!response.ok) {
    throw new Error("Failed to fetch data file.")
  }

  const data = await response.json()

  if (data.error) {
    return null
  }

  return data.dataset
}

export default async function DataView({ params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params
  const dataset = await getDataset(filename as string)

  return (
    <div className="h-100 w-100">
      <h2 className="mb-4">{filename}</h2>
      {dataset === null ? (
        <p>Data file not found.</p>
      ) : (
        <InflammationChart data={dataset} />
      )}
    </div>
  );
}
~~~

Next, rather than plotting the 2-d array of data as a heatmap, we can compute some statistics on the data in `inflammation-chart.tsx`:

~~~
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
		<div>{JSON.stringify(stats, null, 2)}</div>
	);
}
~~~

This is better, but still quite hard to read or make sense of. In this case, it makes sense to either render it in a table or visualize the data. To visualize it, we can add [recharts](https://recharts.github.io/) to our application with:

~~~
pnpm add recharts
~~~
{: .language-bash}

and import it into `InflammationChart` with:

~~~
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
~~~

We can make use of `recharts` with:

~~~
export function InflammationChart({ data }: { data: Dataset }) {
  	const stats = toDailyStats(data)

  	return (
		<ResponsiveContainer className="flex-1" width="100%" height="100%">
			<LineChart data={stats}>
				<Line type="monotone" dataKey="average" stroke="#007833" />
				<Line type="monotone" dataKey="max" stroke="red" />
				<Line type="monotone" dataKey="min" stroke="blue" />
			</LineChart>
		</ResponsiveContainer>
	);
}
~~~

This is a good start, but we can improve it with a few additional features provided by `recharts`:

~~~
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
~~~

# Conclusion

You should now be able to use recharts to visualize data in a React app. With this, the tutorial application is now fully functional. If you want to continue your learning from here, the next steps are recommended:

1. Learn more about [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) to learn how to build complex layouts in browsers.
2. Use the [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/) to learn more about how we could build the server-side from scratch.
3. Use the [nginx Beginner's Guide](https://nginx.org/en/docs/beginners_guide.html) to learn how to deploy Next.js and FastAPI in a production environment.
4. Consider how you could add authentication to the site. If you already have a source of identity for your users, we recommend [OIDC](https://openid.net/developers/how-connect-works/). Otherwise, [FastAPI Users](https://fastapi-users.github.io/) provides a good starting point for adding identity management directly to a FastAPI application.
