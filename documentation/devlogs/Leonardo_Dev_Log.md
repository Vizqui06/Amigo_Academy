# Date: 21/10/2025
# Project / Module: Front-End

## Goals for today
- Update the package.json so we can run "npm start" instead of "node server.js", making more faster to start the server


## Task completed
- Created all the Front-End (the index.html, bootstrap.html, css and front_AIUsage files), including the images (made by Gemini AI), 
the modules, form, footer, and practically all the features can be seen at first view of the page.

- Created the sign up with Google function on server.


## Use of Gen AI
Moderated, mostly used for style than functionality, but I also asked for logic implementation of the forms 
(how is the format to do it and how can it be sent to an email when the user send the form) and ask AI to comment the index, 
bootstrap and server files so debbuging result much more easy.

Propmt:
"Can you comment this bootstrap file with a naturally-descriptive-first person style so debbuging can result much more easy to do?"

Result:
"I agree comment make codes much more easy to debug. Here is your 'bootstrap' file commented in a 
'naturally-descriptive-first person style':" and it gave me the file commented.
---

Propmt:
"What are the best web styles (font family, colors and distribution of the page) for web pages related to eductaion like Khan Academy or Udemy?"

Result:
Summarizing, the AI gave me recommended fonts and many style features to implement in both CSS and Bootstrap files, so it can look like 
a modern-professional academic website.
---

--For the "Sign up with Google" function, I have to admit I used AI to debug the server, the env vars of Render and the client services of Google
Cloud Console. I was desperated so ask AI to "fix my code" several times (with specific instruccions about what was happening & what should happen).
Made several unnecesary commits for failed tests on this repo. Actually, the error was really simple, there were two URLs that were mismatching 
themselves causing the sign up malfunctioning; had to update several times my repo & Render env vars, also, I had to create a more strong & secure CLIEN_SECRET on Render.But I didn't noticed that our emails were not put on the CLIENTS test section (it means that, not having our emails there resulted in constant failures).


## What i learned

- Front End is tedious and time-consuming because of the multiple times I had to test that the page looks like I want to to look like.
- Frustration and despair made me appeal to AI guidance, because its faster and more personalized to my situation instead of documentation or the slides.
- AI can hallucinate and stop thinking as it should. When reached  that point, I closed the tab and serched the issue by myself, It didn't take long to
understand what was the mistake. I spent 2 hours debugging the code with AI and still failing but 45 minutes reading and solving the problem.


## Challenges
- The grid modules (I have to ask AI why can't the modules be on columns of three despite my CSS config), why certain elements of the page dissapeared 
while working on the bootstrap and index files, the form's aspect to not look like an 80's suspicious form, etc.

- In Sign in implementation, all "cannot GET...", "unauthorized access", "mistaken routes redirection", "502", "404" errors made me suffer at the point I had to
consult AI to help me understand why did the function was failing over and over.


## Resources Used
- YouTube, Web class presentations, bootstrap documentation, Render documentation, Cloud documentation and AI guidance and recommendations.


## Personal Reflection
- Front-End creation requires a LOT of time and memorization of usage of labels (more in bootstrap), is too much "talacha". But for Back-End, 
it requieres a LOT of logic and critical thinking to be effective and responsive. Front-end may be disfunctional but can look pretty (at first look), 
but a disfunctional back-end is useless back-end.

- I've learned much more in YouTube channels than official documentation and college classes. Most part of my code is based on codes youtubers 
made while streaming about web application development. But because a streaming is public, I didn't steal their codes.

- Despite being boring, tedious and sometimes confusing, READING documentation can solve (or at least, show you a path) your code errors. Unfortunetly, I didn't 
consult real documentations before asking AI to help me out. I could had had a better, simplier and cleaner code if I just read the documentation.

--------------------------------
# Important
- Late devs logs creation so if there are blank spaces is because the late inclution of it.

--------------------------------

# Date: 28/11/2025
# Project / Module: Course imp. and APIs
## Goals for today
 - Enhance the courses section and courses themselves.

## Task completed
- Enhanced courses by makking them more enjoyable to the view and make them show more content and adding more descriptions.

## Use of Gen AI
 - Ask how to make them atractive and beautiful to the user (frontend) and making AI judge the backend implementation we used for it.

## What I learned
- The difficulties that takes creating a beautiful page section than just making them functional but look like a 80's frontend.

## Challenges
- Keeping the courses functional while making them look pretty.

## Resources Used
- Online documentation, YouTube guides and AI suggestions.

## Personal Reflection
- Frontend is tedious when trying to apply it in a new environment such as React.



# Date: 2/12/2025
# Project / Module: Course imp. and APIs
## Goals for today
 - Implementation of 3rd party API (confetti) and REST API (motivational quote)

## Task completed
- Adding two simple APIs ASAP because we were running out of time. 

## Use of Gen AI
 - Ask AI for two simple and quick-implementation APIs

## What I learned
- It is not that complicated to implement them, just choose a well API takes time.

## Challenges
- Seeing where and how I have to implement them in the files. Took me too much time for the task that it is.

## Resources Used
- AI to select for me good and free APIs

## Personal Reflection
- I had to do a chack list for avoiding this types of rush.