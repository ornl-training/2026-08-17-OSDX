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
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="mb-4">Web Development Tutorial</h1>
        <div>
          <h2 className="mb-4">Select A File to View</h2>
          <ul className="grid grid-cols-3 gap-4">
            {filenames.map((filename, index) => (
              <Link key={index} className="p-4 border cursor-pointer" href={`/data/${filename}/`} target="_blank">
                {filename}
              </Link>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
