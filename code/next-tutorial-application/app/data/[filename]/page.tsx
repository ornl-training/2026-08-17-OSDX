import { Dataset, InflammationChart } from "../../../components/inflammation-chart"

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
        <InflammationChart data={dataset} />
      )}
    </div>
  );
}
