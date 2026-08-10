type Dataset = {
  columns: number[]
  index: number[]
  data: number[][]
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
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="mb-4">Web Development Tutorial</h1>
        <div>
          <h2 className="mb-4">{filename}</h2>
          {dataset === null ? (
            <p>Data file not found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="border-collapse">
                <thead>
                  <tr>
                    {dataset.columns.map((column) => (
                      <th key={column} className="border p-2 text-sm font-normal">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataset.data.map((row, rowIndex) => (
                    <tr key={dataset.index[rowIndex]}>
                      {row.map((value, columnIndex) => (
                        <td key={columnIndex} className="border p-2 text-sm text-center">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}