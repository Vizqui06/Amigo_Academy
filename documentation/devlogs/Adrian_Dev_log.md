
# Date: 20/10/2025
# Project / Module: Prototype Phase
## Goals for today
- Create the frontend structure for the prototype version of the project.

## Task completed
- I developed some of the front end design in the prototype version and also some back end things.
- Established the basic HTML structure.

## Use of Gen AI
Prompt:

Result:


## What I learned
- How to use properly HTML and some CSS in the early stages of a project.

## Challenges
- Keeping the code organized in the prototype.

## Resources Used
- Basic HTML/CSS documentation.

## Personal Reflection
- The prototype is ugly but functional. It is good to have a working base before worrying about advanced styling.

--------------------------------

# Date: 
# Project / Module: Version with bootsrap
## Goals for today
- Migrate from prototype to the final version repository.
- Improve the design using a CSS framework (bootstrao).

## Task completed
- In this version i developed with bootstrap while investigating how to use it.
- Replaced manual CSS with Bootstrap classes for better layout management.

## Use of Gen AI
Prompt:
"How to install and use Bootstrap 5 in my project? Give me examples of a responsive navigation bar."

Result:
The AI provided the CDN links to include in the head of my HTML and a code snippet for a responsive navbar that collapses on mobile screens.

## What I learned
- How to read documentation for external libraries and implement a grid system using Bootstrap.

## Challenges
- Understanding how Bootstrap classes override default styles and learning the syntax.

## Resources Used
- Bootstrap 5 Documentation.

## Personal Reflection
- Using a framework speeds up development significantly compared to writing raw CSS, though there is a learning curve.
- I love bootstrap.

--------------------------------

# Date: 18-27/11/2025
# Project / Module: UI/UX Redesign
## Goals for today
- Improve the visual appeal of the application.
- Apply a coherent color scheme.

## Task completed
- I re designed the whole page to be more intuitive or attractive to the user.
- I changed the colors and contrast of the color palette inspired in a certain web page.

## Use of Gen AI
Prompt:


Result:


## What I learned
- The importance of visual hierarchy and contrast to guide the user's eye to important elements (based on what i found visually pleasant).
- How to replicate a design style from a reference website.

## Challenges
- Finding the right balance so the page doesn't look too crowded or too empty.

## Resources Used
- Reference website (for inspiration).
- Paper and pencil (antique tools).

## Personal Reflection
- The application finally looks professional. The new palette makes it feel much more visually atractive.

--------------------------------

# Date: 02/12/2025
# Project / Module: Deployment & Debugging
## Goals for today
- Deploy the application in Render.
- Ensure the live version matches the local version.

## Task completed
- Fix some problems with Render and the local enviroment constants.
- Solved issues where the app worked on my machine but crashed on the server.

## Use of Gen AI
**Prompt:**
"My app fails on Render with 'Module not found' but works locally. How do I fix this?"

**Result:**
The AI advised me to check my package.json file and ensure all libraries are listed there, and to check if I was using absolute file paths that don't exist on the server.

## What I learned
- The difference between `localhost` and a production server and how do start it.
- The importance of relative paths and environment dependencies.

## Challenges
- Debugging errors without seeing the console directly, relying on server logs.

## Resources Used
- Render Dashboard / Logs.

## Personal Reflection
- Deployment is tricky. It was frustrating that it worked perfectly on my PC but not on the web, but solving it gave me a lot of insight into how servers work.