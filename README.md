# Bias Buster

## Inspiration

Misinformation has grown widespread in the recent decades as a result of the rapid increase of technological communication. The majority of the population learn a considerable amount of information from online sources and social media; however, it is often difficult to distinguish whether this information is incorrect or holds bias, even from the most reputable of sources.

This issue, in particular, impacts groups of minorities on a greater level because it manifests into prejudice and discrimination. Leading to limited opportunities, stereotyping, social inequality, and cultural erosion, misinformation and bias are dangerous concepts that alter the perception of information.

Furthermore, studies have shown that minority groups and those living in poverty are disproportionately affected by misinformation and bias as concluded from studies by Grambo (2018), Bullock (1991), and Seo (2021) posing it as a major threat that harms the knowledge accessible to the general public, particularly towards minority groups.

This issue inspired us to create Bias Buster, a free, open-source browser extension that aims to empower users in identifying and accessing reliable and accurate news and media. We believe that Bias Buster serves as a crucial resource in identifying and rectifying misinformation and bias by leveraging the perspectives and insights of minority groups. By focusing on underrepresented viewpoints, Bias Buster challenges prevailing narratives and enriches the information landscape.

This approach is fundamental in promoting a more inclusive and unbiased understanding of digital information, making Bias Buster an essential tool for fostering informed discourse.

## What it does

Our Chrome extension enables users to quickly and efficiently provide information regarding the bias or misinformation that a website propagates. Users can use the extension to rate the reliability of the information on the website as a whole, view the average rating from other users, and post comments on the web page with more information regarding its validity and prejudice. In addition, the extension is easy to set up and maintains the privacy of the user. Whether a user wants to maintain a specific username to their identity (in the optional username input while writing a comment) or forgo any identification measures is entirely up to the individual.

## How we built it

We chose to forgo a Javascript framework to minimize complex configuration, and instead, manually manipulated DOM.

We used HTML, CSS, Javascript, Moment.JS (to display the time comments were posted), TailwindCSS (for styling and quicker development), Flowbite (for TailwindCSS components and Javascript interactivity code), and Webpack (for bundling node_modules) for the extension. On the backend, we used Python, Flask (due to its simplicity and ease of use), and MongoDB (to store comments and ratings).

## Challenges we ran into

Due to the nature of Chrome extensions, using a Javascript framework is significantly more complicated than using pure HTML and requires considerably more setup which we were not familiar with. Because of this, we decided to abstain from using a framework and chose to code our app without one instead. While we did save time on unnecessary errors and configuration by not using a framework, needing to manually manipulate the DOM increased development time and the complexity of the code.

Additionally, Chrome extensions have stricter CSP requirements (they only support a subset of the specification), so we had to learn how to navigate around these during the development of the extension.

## References

Bullock, Charles S. "Misinformation and misperceptions: a little knowledge can be dangerous." Social Science Quarterly 72.4 (1991): 834-839.
Grambo, Kimberly. "Fake news and racial, ethnic, and religious minorities: A precarious quest for truth." U. Pa. J. Const. L. 21 (2018): 1299.
Seo, Hyunjin, et al. "Vulnerable populations and misinformation: A mixed-methods approach to underserved older adults’ online information assessment." New Media & Society 23.7 (2021): 2012-2033.

## Running Locally

### Running the Flask Backend

Setup up a MongoDB database instance either through MongoDB cloud or locally. Create a `.env` file and create a key `MONGO_URI`. Set the value of the key equal to the URL of the database you generated earlier.

### Running the Extension

To run the TailwindCSS CLI (needed for bundling only necessary files), run the command `npm run tailwind-build` (or `npm run tailwind-build-watch`).

Then, run `npm run webpack-build-dev` (or `npm run webpack-build-prod` for production) to bundle the files.

After that, enable developer mode on the extensions page in a Chromium browser and click on `Load Unpacked` and select the `dist` folder created in the last step.
