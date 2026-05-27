---
title: "Starting a Next.js Project"
teaching: 10
exercises: 0
questions:
	- "What is Next.js?"
	- "What is the difference between Next.js and React?"
	- "How do I create a Next.js project?"
objectives:
	- "Introduce Next.Js"
	- "Create an empty Next.js project."
	- "Run an initial empty Next.js application."
keypoints:
	- "Next.Js is a React framework for creating web applications."
	- "Set up your Next.js project with 'pnpm create next-app'."
	- "Run your Next.js application with 'pnpm run dev'."

---

> For the latest information on Next.js, [see the official documentation](https://nextjs.org/docs)
{: .callout}

## Next.js

In order to explain what Next.js is and what it is used for, we must first start with React. 
React is a popular JavaScript library for writing user interfaces on the web. Many popular web
sites use React for their frontend including Facebook, PayPal, Netflix, amongst others. At its
core, React is used to write UI components, render them in your browser, and update their state 
when necessary. What React does *not* do, however, is manage a webserver, allow users to navigate 
to different pages (called routing), or provide tools for interfacing with external services or 
data. This is where Next.js comes in. Next.js is a framework built around React that provides 
routing, server-side rendering, and more. React is used to write the UI components, and Next.js 
essentially handles building and serving your web application that uses said components for 
its UI. Next.js is developed and maintained by [Vercel](https://vercel.com/about). There are 
other technologies that serve a similar purpose, such as [React-Router](https://reactrouter.com/),
but we will focus on Next.Js, as it is one of the most popular React frameworks, 
if not the most popular.

## Setting Up a Next.js Project

Next.js provides a convenient CLI to create a new Next.js application. In your terminal, navigate to
where you want your application to be located. From there, use `pnpm` to run the `create next-app` 
command.

~~~
pnpm create next-app
~~~
{: .language-bash}

You will see several questions in yout terminal that will be used to define various details of your
project.

~~~

What is your project named? next-tutorial-application
Would you like to use the recommended Next.js defaults?
    > Yes, use recommended defaults - TypeScript, ESLint, Tailwind CSS, App Router, AGENTS.md
    No, reuse previous settings
    No, customize settings - Choose your own preferences
~~~
{: .language-bash}

Name your application to `next-tutorial-application` (or whatever you want). Choose yes, when asked
if you want to use the recommended defaults, by pressing "Enter" with that option selected.


## Running Your Application

Now, that we've set up our Next.js project, we can run it to see the default content. Navigate inside 
of your `next-tutorial-application` directory.

~~~
cd next-tutorial-application
~~~
{: .language-bash}

We can now use `pnpm` to run our development server. Run this command in your terminal.

~~~
pnpm run dev
~~~
{: .language-bash}

Open a browser and navigate to `http://localhost:3000`. You should see a Next.js page running here.
You are now set up and ready to begin developing your Next.js application.
