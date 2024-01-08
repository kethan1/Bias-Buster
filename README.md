# Bias Buster

## Inspiration

Misinformation has been a growing concern in recent times as an increasing number of people receive their news and information from online sources, many of which provide information of dubious quality. Furthermore, studies have shown that minority groups and those living in poverty are disproportionately affected by misinformation, posing it as a major threat that harms the knowledge of the public, and especially that of minority. This issue inspired us to create Bias Buster, a free, open-source browser extension that aims to enable everyone to access and identify reliable and accurate news and media, something we believe is key in this digital age.

## What it does

Our Chrome extension enables users to quickly and efficiently provide information regarding the bias of websites to others using the extension. Users can rate the bias of websites, view the average rating, and post comments with more information regarding its validity and prejudice. The extension is easy to setup and maintains the privacy of user.

## How we built it

We chose to do without a Javascript framework to minimize complex configuration, and instead manually manipulated DOM.
We used HTML, CSS, Javascript, Moment.JS (to display the time comments were posted), TailwindCSS (for styling and quicker development), Flowbite (for TailwindCSS components and Javascript interactivity code), and Webpack (for bundling `node_modules`) for the extension. On the backend, we used Python, Flask (due to its simplicity and ease of use), and MongoDB (to store comments and ratings).

## Challenges we ran into

Due to the nature of Chrome extensions, using a Javascript framework is significantly more complicated than using pure HTML and requires significantly more setup which we were not familiar with. Because of this, we decided forgo using a framework and chose to code our app without one instead. While we did save on needless errors and configuration by not using a framework, needing to manually manipulate the DOM increased development time and the complexity of the code.
Additionally, Chrome extensions have stricter CSP requirements (they only support a subset of the specification), so we had to learn how to navigate around these.
