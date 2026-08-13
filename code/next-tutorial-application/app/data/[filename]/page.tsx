import InflammationChart, { DailyStats } from "../../../components/inflammation-chart"

type Dataset = {
  columns: number[]
  index: number[]
  data: number[][]
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

export default async function DataView({ params }: { params: Promise<{ filename: String }> }) {
  const { filename } = await params
  const dataset = await getDataset(filename as string)

  return (
    <div className="w-full">
      <h2 className="mb-4">{filename}</h2>
      {dataset === null ? (
        <p>Data file not found.</p>
      ) : (
        <InflammationChart data={toDailyStats(dataset)} />
      )}
    </div>
  );
}