---
title: "Basics of HTML, CSS, and JavaScript"
teaching: 30
exercises: 0
questions:
	- "What is HTML?"
	- "How do I write HTML?"
	- "What is CSS?"
	- "How do I write CSS?"
	- "What is JavaScript?"
	- "How do I write Javascript?"
objectives:
	- "Introduce HTML"
	- "Introduce CSS"
	- "Introduce JavaScript"
keypoints:
	- "HTML, CSS, and JavaScript are the core technologies behind web sites and web applications."
---

## HTML

When using a browser to navigate the web, web sites have a standardized way of telling your 
browser what to show you. HyperText Markup Language, better known as HTML, is the format that
 desribes what the different pieces of the web site are, where they are placed on the screen, 
 and how these pieces look. HTML files are composed by grouping various components called 
 "Elements". For example, a link on the screen would be considered an element, as would a 
 button, a table, or a text paragraph. Elements can have other elements nested inside of 
 them. These sub-elements are typically called "Children" and can also have children of 
 their own. This creates a tree structure that is collectively referred to as a Document 
 Object Model or DOM. HTML files are also commonly called documents as a result.

### Tags

When actually writing an actual HTML file, you create elements by typing a specific format:

~~~
<!-- This is a commment in HTML. -->
<html></html>
~~~

This format is called a Tag. HTML tags describe what the type of element that is going 
to be added, and unlike other markup formats like XML, for example, HTML tags are mostly 
predefined in order to keep HTML consistent across all web sites and browsers. You can 
find a full list of available tags here: https://www.w3schools.com/tAGS/default.asp. 
Every tag that you add to your document must also be "closed" at some point in your 
document. All this means is basically specifying using the appropriate syntax that 
you have finished describing your element and all of its children. You do this by 
adding *another* tag with a similar, but slightly different syntax:

~~~
<!-- The <div> tag specifies a section or content container in your page. -->
<!-- The below tag is the 'opening' tag. -->
<div>

</div>
<!-- The above tag is the 'closing' tag, notice the '/' in front of the tag name. -->

<!-- Tags can be placed in one line or span multiple lines. -->
<p></p>
<!-- The <p> tag specifies a text paragraph. -->
~~~


Quick note, like most standards, HTML has undergone updates throughout its history. 
At the moment, HTML is considered to be a "living standard" instead of a specific 
version, with the last numbered version being HTML 5 (5.2).

### Children

In order to add a child to an element, you simply add the desired tag for the child 
in between the opening and closing tags of whatever element should be the parent.

~~~
<div>
	<div>
	<!-- This div is a child. -->
	</div>
</div>
~~~

Every HTML document must have a single "html" tag.

~~~
<html>
	<!-- All of the page's elements will be in here -->
</html>
~~~
All of the content of your page will be children inside of the `html` tags. 


### Content

If at this point, you've started writing an HTML document, you may be noticing that 
nothing is showing up on your screen if you open the file in your browser. We can fix 
that by adding text to our tags that we want to be displayed. We do this, by simply 
inserting this text in between the opening and closing tags of the appropriate element 
similar to adding a child (without the tag syntax);

~~~
<div>This text will be displayed onscreen!</div>

~~~

### Attributes

HTML elements often have various types of metadata that are used to identify different 
elements, describe how they look, and even define extra functionality. These pieces of 
metadata are called "Attributes" and are specified by inserting a key-value pair *inside 
of the opening tag of the element, after the tag name*.

~~~
<div id="my-divd"> </div>

~~~
The above example shows a "div" tag that has an attribute called "id." The id attribute 
is a standard attribute that represents a unique id that will be used to identify that 
specific element. The attribute has to be placed after the tag name, but before the 
closing bracket `>` in the *opening* tag. Some common attributes include `id`, `class`, 
which is used for identification and describing elements, and `href`, which is shown below.

~~~
<!-- The <a> tag is an "anchor." Anchors specify a link to another web page. -->
<a href="https://google.com/">This is a link to Google.</a>
~~~

The `href` attribute is the destination that the anchor element should link to. 

Some elements actually don't need any text content or children, rather they consist 
entirely of attributes assigned to a tag. These are referred to as "empty elements." 
In these cases, we don't actually need to write a separate closing tag for the element. 
For example, to embed an image into your page, we can use an `img` tag, which is an empty 
element. 

~~~
<img src="cool_image.jpg" alt="A Cool Image">

<!-- The src attribute specifies the link or path to the image. -->
<!-- The alt attribute specifies text that will be shown when the image cannot be loaded. -->
~~~

Even for normal elements, you can close tags immediately if you don't need to assign content 
or children to them by using this syntax:

~~~
<div/>
<!-- This div has been immediately closed. Notice the '/' right before the closing bracket '>'.-->
~~~

### Styling and Style Properties

To this point, we've described adding elements to your document. These elements so far are 
functional, but they most likely don't look how you want them to look. We can fix this by 
adding a standard attribute to our elements called the `style` attribute or "styling" as 
most people refer to it. Whereas tags by themselves describe what elements our page consists 
of, styling changes how these elements are displayed or "rendered" onscreen. The value of 
our style attribute will be a list of key-value pairs separated by semi-colons. Each key 
value pair will themselves be separated by a colon. To make this clearer, see the following:

~~~
<div id="cool-div" style="color: blue; font-size: 20px;">
This text will be blue and each character a size of 20px.
</div>
~~~  

These key-value pairs are referred to as style "Properties" and will be immensely important 
for designing any sort of web site or web application. In this case the `color` property 
specified the color of any text inside of the element, and the `font-size` property determines 
the size of that text. We can do more than just change text color however. We can also add 
background colors to non-text elements, edit the size of those elements, and add borders to them.

~~~
<div 
	id="cool-div" 
	style="background-color: gray; height: 100px; width: 50px; border: 1px solid black;"
/>
<!-- A single tag can span multiple lines for to make attributes easier to read.-->
~~~
Don't worry about the exact meanings of each of those properties yet, as we will be exploring 
them in future episodes about styling. The important take away is that many web pages will have 
many elements (most often `div` elements) in their DOM that are solely there to be styled and 
act as visual elements on the page. 