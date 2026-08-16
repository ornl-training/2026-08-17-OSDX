---
title: "Connecting to an External API"
teaching: 10
exercises: 0
questions:
	- "How do I fetch data from external APIs or services?"
  - "How does the Fetch API in JavaScript work?"
objectives:
	- "Run the server provided with this tutorial."
  - "Use the Fetch API to retrieve data from the server."

---

# Running a FastAPI server

We provide a pre-built FastAPI server for this lesson that can be downloaded [here](/2026-08-17-OSDX/assets/zip/server.zip).

After unzipping the server, you can run it with the following commands:

~~~
cd server
uv run fastapi dev --host 0.0.0.0
~~~
{: .language-bash}

# Reviewing the API docs

When the server has started, you can open http://localhost:8000/docs in your browser. One of the benefits of working with FastAPI is that it automatically generates a documentation site
for the API it is providing, so we can quickly see that there are two endpoints we can use:

1. /data/ - lists all available datafiles that the server can provide to the browser
2. /data/{filename} - provides the contents of a datafile matching a filename provided by the browser

# Connecting to FastAPI with the Fetch API

In React applications, or any other JavaScript-based development frameworks, the preferred mechanism for pulling external content into JavaScript is the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Using it, we can add a function to the homepage that retrieves all available datafiles from the FastAPI server:

~~~
async function getFilenames(): Promise<String[]> {
  const response = await fetch("http://localhost:8000/data/")

  if (!response.ok) {
    throw new Error("Failed to fetch file list.")
  }

  const data = await response.json()

  return data.files
}
~~~

By default, `fetch` will not wait for the server to respond before proceeding to the next command, so it's important that we use the `async`/`await` syntax to avoid unexpected behavior.
We can then update the homepage to display the information retrieved from the server with:

~~~
import Link from "next/link"

export default async function Home() {
  const filenames = await getFilenames()

  return (
    <div>
      <h2 className="mb-4">Select A File to View</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filenames.map((filename, index) => (
          <Link key={index} className="p-4 border cursor-pointer" href={`/data/${filename}/`} target="_blank">
            {filename}
          </Link>
        ))}
      </ul>
    </div>
  );
}
~~~

# Conclusion

You should now be able to connect to an external FastAPI server. The next episode will teach you how to create dynamic routes to create a unique web page for each data file we retrieved from the server.
