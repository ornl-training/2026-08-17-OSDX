---
title: "Dynamic Routing in Next.js"
teaching: 10
exercises: 0
questions:
	- "How do I create dynamic routes in Next.js"
objectives:
	- "Create dynamic a dynamic route in Next.js."

---

# Dynamic Routes in Next.js

In the previous episode, we added a `Link` tag to allow the user to select a datafile to view, but we currently have no way to programmatically determine which file the user selected in the page under the data folder. While we could handle this directly in JavaScript, Next.js provides an easier way to handle this through the use of dynamic routes. To set one up, we need to restructure the data route:

~~~
cd app/data
mkdir [filename]
mv page.tsx [filename]/
~~~
{: .language-bash}

The square brackets tell Next.js to add a parameter to page.tsx called `filename` that we can use to determine which file the user has selected for viewing. We can use the filename to retrieve the data for the file from the FastAPI server:

~~~
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
    <div className="w-full">
      <h2 className="mb-4">{filename}</h2>
      {dataset === null ? (
        <p>Data file not found.</p>
      ) : (
        <div>
          {JSON.stringify(dataset, null, 2)}
          <InflammationChart />
        </div>
      )}
    </div>
  );
}
~~~

# Conclusion

You should now be able to create dynamic routes for a Next.js application. The final episode will show how we can plot the retrieved data on each dynamic route.
