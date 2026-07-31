---
title: "The Basics of a Next.js Project"
teaching: 10
exercises: 0
questions:
	- "How do I create a web page in Next.js"
	- "How do I put content onto my web pages?"
objectives:
	- "Introduce Next.Js routing."
	- "Render React content with Next.js"

---

# Next.js Project Structure

After you have created your initial project, you should see several folders automatically created for you. The `.next` folder contains auto-generated Next.js files. Every time you run your app this folder will be created if it does not exist already. If you ever run into any unexplainable bugs with your application, start with deleting this folder and then running the application again. The `app` folder is where all of your actual code will live. The `node_modules` folder contains installed Node packages. The `public` folder is for certain resources that you can include in your project such as images.

## Routing in Next.js

With traditional static websites, different pages are represented with separate HTML files that the web server serves when requested. In modern day web applications, different pages are often simply different layouts or views that get loaded or "routed" to when appropriate using your framework's "router", although it's possible to combine aspects of both methods. For this tutorial we will be using Next.js's **file-system based routing**. This means that the different routes or pages each have their own individual file detailing their layout and these files get nested into a directory structure that will automatically create routes for you. While this evokes the structure of the static HTML file web sites of old, underneath the hood, Next.js is performing modern day routing. 

The easiest way to understand this concept is to try it out. In your `app` directory, you should see a `page.tsx` file. This file specifies a layout that will be rendered. Because we are in the `app` directory which serves as the root of our application, this page will serve as the initial web page that one sees when navigating to our site `http://localhost:3000/`. While, we'll come back and edit this initial home page later on, for now we'll discuss adding additional pages or routes. 

Go ahead and start your Next.js application with the following command from the root of your project:

~~~
pnpm run dev
~~~
{: .language-bash}

Next.js supports hot-reload, meaning that any changes you make will be automatically reflected in your browser after you save them. If you do not see your changes for some reason, then there is probably a syntax error somewhere in your code, and Next.js will provide details about the particular error. If there are no errors displayed in your browser, and you still do not see any changes, try stopping your application and running the above command again.

Now, in order to create a new route or web page, all that we have to do is create a new directory with the name that we want for that page. Let's go with `user` for now. In your app directory, create a new directory called `user`.

~~~
cd app
mkdir user
~~~
{: .language-bash}

With that, we have added a new route. However, since we don't have any content for this route yet, it will not yet be publically accessible. In order to create content for this page, we should create a `page.tsx` file in this folder. Every route folder that you create must have a `page.tsx` file, called a page file. This is where your main layout and content for that route will live. Let's add the following to our page file that we have created in our `app/user` directory. 

~~~
export default function Page() {
	return (
		<div>
			<h1>Hello Next.js!</h1>
		</div>
	);
}
~~~

Save that file. Now we can go to `http://localhost:3000/user`, and we should see our content. If you edit the text in the `<h1>` tag, and then save those changes, you should see them reflected in your browser immediately. 

Back in your root `app` directory, you may notice a `layout.tsx` file. This file is fittingly called a layout file. These files describe various layouts that will be reused across several pages, such as headers and footers, and we'll explain more about these in a future episode. 

# React Basics

Heading back to our user page in `app/user/page.tsx`, we can now begin to explain the basics of React. If you remember previous episodes, React is a JavaScript library for writing user interfaces. All of your page and layout files will be written using React. Writing code with React acts as almost a hybrid of writing normal JavaScript/TypeScript code and writing actual HTML. Essentially, React code is grouped into pieces called **components**. These components can then be added to *other* components, which can then be used in *even more* components, creating a nested structure of components, similar to HTML. 

From a syntax perspective a component is defined simply by creating a function that returns some sort of element. Inside your user page file, `app/user/page.tsx`, type following (make sure you type it outside of the function that is already in the file, before or after does not matter however):

~~~
function DivComponent() {
	return (
		<div>This is a div.</div>
	);
}
~~~

And with that we've created a React component. In order to use our component in our web page, inside of our default function we can simple enclose the name of the function inside of a tag similar to an HTML element:

~~~
export default function Page() {
	return (
		<div>
			<h1>Hello Next.js!</h1>
			<DivComponent/>
		</div>
	);
}
~~~

It's important to place this tag representing `DivComponent` *inside* of the div, since these functions cannot *directly* return an array of elements. Instead they return single elements. To be clear however, these single elements act as a container, meaning that they **can contain multiple children inside of them**. The easiest approach is to get used to automatically returning a div element from each of your React components and putting all of the nested content into that div element. 

React components can contain any HTML tag such as divs, anchors, images, buttons, so on and so forth. All React components should start with a capital letter in order to distinguish themselves from these HTML elements. It's also worth mentioning that this syntax of including React components in tags is called `JSX`. It's easiest to think of JSX as an extension of JavaScript/TypeScript that allows you to more or less mix HTML and JavaScript together. 

Another thing to consider is that in Next.js, when reading a page file, the *default* function specifies the component that will be used as the layout for the page. If you experiment with changing the default function in our example to DivComponent, ie:

~~~
export default function DivComponent() {
	return (
		<div>This is a div.</div>
	);
}

function Page() {
	return (
		<div>
			<h1>Hello Next.js!</h1>
			<DivComponent/>
		</div>
	);
}
~~~

You'll notice that your page is *only* rendering "This is a div." This shows up that the default function is actually what determines the base layout, not the name of the function itself. This gives you the freedom to name your components whatever you want as long as you are exporting the appropriate component function as the default. **Make sure you revert the default function change for the next part of this episode.** 

## React Component Files

In order to facilitate the ability to reuse components, it is common practice to place React components inside of their own files. Inside of the project root directory (the parent directory of the `app` folder), create a `components` directory. The reason we're placing this folder here is to simply give us the freedom to not have to worry about naming conflicts with any of our Next.js logic. In this case, we do not want to define a route called "components," we simply just want to create a normal directory. Inside of `components`, you can structure your files and sub-directories however you want. For this tutorial, we'll just create our components directly in this folder. Create a new TypeScript file called `DivComponent.tsx`. Move the custom `DivComponent` logic from above to this file, making sure to add the `export` keyword as part of the function declaration. 

~~~
export function DivComponent() {
	return (
		<div>This is a div.</div>
	);
}
~~~

Back in your `app/user/page.tsx` page file, make sure the definition of `DivComponent` is removed. Then import your React component like you would any other JavaScript code (note this code assumes the same directory structure as described in the previous paragraph).

~~~
import { DivComponent } from '../../components/DivComponent';

export default function Page() {
	return (
		<div>
			<h1>Hello Next.js!</h1>
			<DivComponent/>
		</div>
	);
}
~~~

At `http://localhost:3000/user` you should see the same content as before. Now, as an exercise, go back to the root page file at `app/page.tsx`. See if you can include your `DivComponent` file in this page as well. Navigate to `http://localhost:3000/` to see if your changes work. 

# Conclusion

You should now be able to create various routes or web pages in your application and add basic React components to them. These routes are defined by the file structure inside of your `app` directory along with page and layout files. The React components are made up of HTML elements and *other* React components with a syntax called `JSX`. The next episode will cover how to being to style your application to look like an actual site versus several disparate HTML elements. 