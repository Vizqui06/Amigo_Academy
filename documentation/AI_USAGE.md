AI USAGE

BACKEND

AI Usage Report: Amigo's Academy Project

This section outlines how our team used an AI assistant as a conceptual and technical advisor during the development of the "Amigo's Academy" backend, in compliance with the project's AI usage policy.

Overview of AI Assistance

The prompts we sent to the AI were, first of all, well structured. The prompts were mainly focused on the organization of folders and files (Because we had some problems with the proper organization of some files such as public, courses etc.) Besides, enough context of the file organization and desired functionality of certain (not all) files inside the project's folder.
As a good practice, when correcting, updating or fixing 'paths' in files. First we provided the AI with the main organization of files and folders of the project.

Some AI Prompt Examples are the following:


1.- Error in the repository organization. 

While trying to "migrate" the project to React, we stumbled upon a LOT of problems, until we reached a "point of no return" in which our errors and inadequate file management made us realize the repository needed to be "Done Again". 

"I've been having some errors in my repository. Could you please explain me with detail the proper organization of a project following the MERN Stack (MongoDB, Express, React, Node.js) and the proper extension of each file? Also, please check the link to the repo and tell me what is wrong in the file and folder organization and if possible, how should I correct it"
*Then attached the link to the GitHub Repository*

2.- Correct "Sign up with Google" implementation.

We had some trouble with the Google Sign-In. We already had a client service on Google Cloud and the basic environment variables on Render (the secrets were given by Google in a JSON file after created the client service).
When tested the function in local, it didn't worked, it send us to a blank page with an "cannot GET" error typed on the superior left corner & in the render page, 
the sign up function wasn't there. 

AI helped us to manually redeploy and update Render and Cloud variables
A similar thing happened with some of our .env.local variables to be able to run the project correctly.


FRONTEND

AI Usage Report: Amigo's Academy Project

This section outlines how our team used an AI assistant as a conceptual and technical advisor during the development of the "Amigo's Academy" frontend, in compliance with the project's AI usage policy.


Overview of AI Assistance


Throughout this project, our team used an AI assistant primarily as a Socratic partner and a technical consultant. The AI's role was to help us brainstorm solutions for a professional UI/UX, explain complex Tailwind / React implementations, and assist in identifying logical design errors in our code.

1.- "Unpleasant" User Interface according to color theme.

One of the team members found a major flaw in our project's Frontend/User interface if the user's computer was using the "dark theme". In which almost 90% of our website's text, cards and general design was not visible and the text wasn't legible.

We solved this issue with help from AI. Prompt:

"My website's main page isn't quite visible if I'm using the System's Dark Mode/Theme. How can I fix this issue and in which file(s) or is there a general configuration to fix this?. "

AI suggested.

2.- Progress Bar.

We realized that user's should have a way to be able to measure their progress in each of the courses. So we decided to implement a progress bar and a "mark as completed" checkmark system.

After implementing the checkmarks system we had some trouble to show the "progress" in the progress bar (meaning that the bar should be colored after completing a lesson).
We  turned to AI to help us fix this issue.
Naturally, this issue also had to be fixed from the backend so this was an AI intervention on both sections of the website, not to mention one of the biggest.


In both cases, our team used the AI to debug our logic and accelerate problem-solving, and we performed the code corrections ourselves. Also, it helped
us to improve our documentation files so they are now more professional and descriptive of what the project is about and so.