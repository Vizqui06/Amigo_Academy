# Date: 18/10/2025
# Project / Module: Back End. LocalHost transition

## Goals for today
- Run the page using Localhost:3000 instead of GoLive extension


## Task completed
- Created the server.js file to run the page via localhost. There are a few mistakes to fix, primarily the path to get the courses information


## Use of Gen AI
None needed
Propmt:

Result:

---

## What I learned
- We hadn't installed node express to the project yet
- We used the import method instead of the require.


## Challenges
- Because we used the import method instead of the require, we had to change the type module of the json files.


## Resources Used
- Time is a resource

## Personal Reflection
- We need to start imporoving our communication as a team


--------------------------------

# Date: 19/10/2025
# Project / Module: General File organization - related to Back End 

## Goals for today
- Fixing file and folder organization inside the project


## Task completed
- Created public, data, api and courses folders to re-organize the already existing files into a better structure for the server.js to work propertly.


## Use of Gen AI

Propmt:

I have an error trying to get the file(s) of this path 'api/courses/:id'. I believe this error is in the server.js. Could you help me find and if possible, correct this file? Take into account this is the project's current file and folder organization:

(+) Folder
(-) File

+ Project
    + Courses
		- (id.json files)
	+ Data
		- Courses.json
		+ CSS
    + Images
- index.html
- package.json
- package-lock.json

I skipped some "node_modules" or "documentation" files and folders as I believe they are irrelevant to this mistake

*Attached the code of server.js.


Result:

A txt file made of symbols (| - ) and few words, potraying how the folder and file organization should be for the proper working of the server paths

(Example)
(+) Folder
(-) File

+ Project
	+ API
		+ Courses
			- (id.json files)
	+ Data
		- Courses.json
	+ Public
		+ CSS
		+ Images
		- index.html
	- package.json
	- package-lock.json

---

## What i learned
- That the path in server.js was wrong. 
- The project needed a "public" folder

## Challenges
- Had to explain to the AI (ChatGPT). How were the files and folders in my project organized

## Resources Used
- Servre.js code


## Personal Reflection
- AI is kind and patient with me.
- I believe if we had settled this from the start. We could have saved lots of time and AI Usage.

--------------------------------

# Date: 9/11/2025
# Project / Module: Academia del Amigo
## Goals for today
Implement the files and folders needed to be able to start programming a more professional backend of the server.

## Task completed
- This took me longer than expected as I had to organize most files and folders according to a proper and professional structure while having to work in other scholar projects.

## Use of Gen AI
I asked AI to do a diagram (by using ASCII) of the proper organization of a website like this.

## What I learned
- The folder and file management and organization happened to be very different from what we've thought so we found it easier to move the project to a new repository

## Challenges
- Time, Scholar Projects.

## Resources Used
- Time. VSCode

## Personal Reflection
- I believe changing of repository can help us a lot, as now we have all of the information more clearly organized; however it can also be a little bit more complex to understand compared to the previous projetc version's repository.

--------------------------------

# Date: 25/11/2025
# Project / Module: General Backend
## Goals for today
While trying to "migrate" into React (and MERN structure). We experienced a massive fail, and the backend of our website isn't running propertly. Not only images and courses aren't loading properly but also paths in the URI are "not found".
## Task completed
- NOT QUITE. NEXT DEVLOG TASK WILL TALK ABOUT THIS

## Use of Gen AI
Honestly a lot. I have no track of the prompts used to "fix" this. Mainly the prompts themselves were the Error shown on screen followed by a section or file of our code in which the Error was supposed to be at

When an error was fixed another one was shown and so on. AI did help us a lot into correcting these errors, however the website's functionallity wasn't the same and we still got ocassional errors that we stopped fixing. Then we came up with an idea, which I'll talk about in the following task documentation.
## What I learned
- We should've tried to restore the previous repository version of itself instead of trying to fix the current one. 
- We should do smaller commits and pushes more often. And have a functional version if one version fails massively.

## Challenges
- AI wasn't enough.
- We had to do a presentation of this project just a few days later.

## Resources Used
- AI (various)
- Time

## Personal Reflection
- Same as "What I learned". We should try to be more "aware" that not only mistakes, but things like these can also happen in a project in real life and we should've been ready or at least ready for when something like these happened

--------------------------------

# Date: 27/11/2025
# Project / Module: Change of Repository
## Goals for today
After the fail with our previous repository. We decided the best option for us is to change of repository and rebuild the project with what's still functional of our previous repo. As we believe we've reached a point of no return in mistakes and errors of the previous repo.
## Task completed
- Created a New Repository with the name: "Amigo's Academy"
- It contains the proper folder and file organization. Also includes correct routes and a funtional backend, however all of the page's frontend was lost.

## Use of Gen AI
I needed to implement the apropriate folder and file structure of a MERN Stack and Full Stack project. Taking into account what could be "saved" from the prevoius repo,.

I asked AI to do mainly 2 things:
1.- Explain to me the proper organization of a Full Stack project organization that follows the MERN Stack from Zero
2.- In the same context, what did we do wrong and what can be useful for the new repository.
## What I learned
- Most of the Routes of our previous server were wrong, not to mention the folder structure we were supposed to follow had to be more "clean"

## Challenges
- The AI was a little bit clumsy at some times. Some other times... quite the contrary. A few times it even insisted on creating proper code without taking into account the previous repository

## Resources Used
- AI
- Time

## Personal Reflection
- We should've done this a long time ago. The new repository was way more clean and organized than our previous one.