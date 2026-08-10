export default async function DataView({ params }: { params: Promise<{ filename: String }> }) {
  const { filename } = await params

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="mb-4">Web Development Tutorial</h1>
        <div>
          <h2 className="mb-4">{filename}</h2>
        </div>
      </main>
    </div>
  );
}