---
title: Evolution of effulgence.io
date: 3/02/2017
description: "A short overview of how I built this website from v1 to v3."
draft: false
---
___
<!-- *This post is going to be a little hard to read for those that don't speak nerd.* -->

What started as a school project for a web-based portfolio eventually turned into effulgence.io.

For me, creating a portfolio meant much more than simply slapping a collection of links on a webpage with my name on it and some social media icons at the bottom. I didn't want to have a standard navigation bar where you'd find all the links one would expect. Well, I did... but not in the same form as everybody else. I was so attached to the idea of having something distinct that would actually convey my own sense of aesthetic. I wanted something that you could look at and *immediately* tell it's mine.

After a few hours of sketching, I came up with this mock up:

I was fond of this design. It resembles an abstract P (to me atleast, most people didn't see it at first glance), and strays away from the standard path that everyone else takes. The idea of embedding links and pictures in them enticed me. I felt very strongly about having visual elements on site, much more than textual ones. You know.. as they say, pictures speak a thousand words. Something about your eyes interpreting colors and visual data in a parallel manner vs interpreting text in a serial manner. Yeah...  that's cool. Let's formalize that on a webpage:
![effulgence.io v2](./v1.jpg)
Check it out live [here.](http://effulgence.io/12)

Now, this was in no way perfect. The styling would crap itself on mobile. Gave it a nice harsh white background (cringe). I hardcoded all the markup and CSS. None of the images were optimized. It was a bunch of ```<div>``` elements floating next to each other in the middle of nowhere. The site loaded extremely slow because of all the external assets I was pulling. I also had the wonderfully brilliant idea of embedding a bunch of soundcloud players and rendering them in an ```<iframe>``` when you clicked on a specific link. All of this made sense for me at the time because that's the only way I thought it was possible, but it also resulted in a very choppy experience. In reality, it was not even a full site. It was a static landing page that just happened to have a bunch of links to other places.

Fast forward a year or so and we arrive at v2:
![effulgence.io v2](./v2.jpg)
Check it out live [here.](http://effulgence.io/v2)

Still not a full site. It's a single page with a bunch of jQuery spaghetti handling clicks and hiding/showing things on cue. Regardless, I got more experience making other sites (and apps). I started to pay a lot more attention to performance, optimization, and cross-browser compatibility. I leveled up my styling chops and came to a better understanding of the web landscape in the general. v2 harnesses the power of inline SVGs, meaning my whole graphic is embedded into my page as a bunch of numbers that the browser knows how to draw. Working with SVG allowed me to be meticulous about the design. It gave me full control of the sizing, curvature of lines, relative placement of the blocks, all with added benefit of not having to write any custom CSS to achieve the same layout. And if I wanted to change something I could simply pop back into Illustrator, make my changes, and copy-paste the new numbers into my HTML. I embedded my navigation links wrapping the ```<path>``` tags of the SVG. And search engines would still crawl through it, because in the end, it's all just markup. Brilliant, thank you W3C.

You might have also noticed that v2 has an animation running in the back. Shortly after v1 and v2, I started spending more time exploring the realm of [creative coding](https://en.wikipedia.org/wiki/Creative_coding). I started a project where I coded a graphic everyday for the year (I failed halfway through but that's another story). But the 100+ pieces that I did do taught me a lot. It became clear to me that I needed to incorporate this into my website. And off I went trying to integrate a ```<canvas>``` element into my site because animations are cool. They add so much to the visual experience. I was an art-major.. of course I was going to add this to my site. Who am I kidding?

v2 gave me a much clearer direction as to where I wanted my site to go. I was happy that I had something unique, and it had a cool animation with some content, but the experience wasn't satisfying enough to me. It felt hacky that I had to do all this weird DOM manipulation just to get the single page application feeling, and I didn't want to remake the whole thing using some hot new JavaScript framework just so I could get the satisfaction of a single page app. And I certainly didn't want my whole page to be rendered dynamically on load, even though Google does index pages that use JavaScript to render their UI. I also wanted to start a blog, so I could post more content and share more of myself on this beautiful World Wide Web. Was I going to keep my current framework and write a bunch of raw markup and use jQuery to animate them? Also the page has no sense of history, meaning that you were stuck on one page and could not navigate using the back and forward buttons. Terrible user experience. There has to be another way.

I considered using Jekyll (a static site/blog generator) for a while, but I REALLY wanted the single page design to work. I did not want the page to refresh every time the user navigated to another page on the site. I wanted it to be a unified, cohesive experience from one place to another, no jitters and no refreshes. With the routing capabilities of the modern browsers, it would be silly to choose the route (hah) of noJAX.

After a lot of research, I ran into an awesome new framework called gatsby.js which is a dynamic site generator which transforms plain text into dynamic blogs and websites using the latest web technologies. No page reloads, and leverages server-side rendering so all the components are rendered into raw markup for production builds. It also bundles all the scripts attached using Webpack. This is huge. You mean I can blog, create a static site, and embed all the interactive elements I want without having to compromise the user experience? I'll take it.

v3 is this. You're on it. It's everything I've ever wanted. Big ups to the creators of gatsby.js and React. The flexibility of this framework is amazing, and it's all because of React's server-side rendering capabilities. The web just gets better and faster everyday.
