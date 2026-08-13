import Link from "next/link"

async function getFilenames(): Promise<String[]> {
  const response = await fetch("http://localhost:8000/data/")

  if (!response.ok) {
    throw new Error("Failed to fetch file list.")
  }

  const data = await response.json()

  return data.files
}

export default async function Home() {
  const filenames = await getFilenames()

  return (
    <div>
      <h2 className="mb-4">Select A File to View</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 grid gap-4">
        {filenames.map((filename, index) => (
          <Link key={index} className="p-4 border cursor-pointer" href={`/data/${filename}/`} target="_blank">
            {filename}
          </Link>
        ))}
      </ul>
    </div>
  );
}
