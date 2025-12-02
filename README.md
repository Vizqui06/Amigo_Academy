README

Amigo Academy - Web Project
Render Deployment: [Amigo Academy](https://amigo-academy.onrender.com/)
Description of the Project:

Amigo Academy is a global educational platform designed to make quality education accessible to everyone, everywhere, completely free. Our project is directly inspired by the mission of the UN's Sustainable Development Goal 4 (SDG 4): to Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all".


In a world where access to learning is often limited by poverty, geography, or social status, this platform provides a digital solution to help close the education gap. Inspired by successful models like Khan Academy and Udemy , our goal is to empower individuals with the knowledge and skills they need to improve their lives and build a sustainable future.


This repository contains the newest version of the platform's front & back-end, built with a clean, accessible, and responsive interface and following the MERN stack.

Current Features:
Responsive Design: The layout correctly adapts to mobile, tablet, and desktop screens using React and Tailwind
Custom Styling: While built on React, the project features a custom color palette and typography to establish a unique brand identity.
Google Sign-In: Integrated Google Sign-In by using  he OAuth 2.0 authorization framework. This also allows to enroll in courses and send feedback to the developers.
Course Enrollment: The Project features a system in which the user can register into various courses and keep track of their progress. 
MongoDB: By implementing a Mongoose Database. The Website can save information of the users and courses implemented.


Technologies Used:

MongoDB: NoSQL Database for saving data (users, courses).
Express: Node.js framework for creating API backend (routes and middleware)
React: Frontend library to build dynamic UI's
Node JS: Environment that allows Server-side JavaScript executing
Tailwind: Styles library for frontend


Installation and Local Use:
Clone the Repository
The project needs to install the required dependencies through npm install to be able to run properly.
Define the port and/or some environment variables in an .env file
Execute the command npm run dev on the Visual Studio Console
Go to http://localhost:3000

(Or simply enter the link of the project deployed in Render)


Project Vision & Future Implementations:
This project is the first phase of a scalable, long-term vision. The technical roadmap is designed to evolve this static site into a full-featured, dynamic platform.

This project's version is still scalable and has the capacity to evolve into a bigger-multilingual learning website. 


NOTE!: The Sign-In only works with an account with the Universidad Panamericana extension
(something@up.edu.mx)

Planned Core Features (from our project proposal ):

Free and Open Access: Implementation of more and high-quality courses. (mathematics, science, languages, and digital literacy will remain 100% free of charge).
True Inclusiveness & Multilingual Design: The platform is still intended to support multiple languages and accessibility tools for learners with disabilities.
Community & Mentorship: Future versions will include spaces for discussion, study groups, and mentorship to connect learners and educators globally.


Open Collaboration: 
We plan to build a system where qualified educators, professionals, and volunteers can contribute, review, and update course content to ensure its quality and diversity.


Technical Roadmap (in progress phases):

Backend: An Express.js server will be built to handle business logic, contact form submissions, and user management. --Done

Database: A MongoDB database using Mongoose will be implemented to dynamically store and manage courses, user data, and platform content. --Done

Authentication: Users will be able to register and log in with Google to track their progress and participate in the community. --Done

Independance: The team will set up the page in a render host service. Because of the low traffic and low capital, the page will "wake up" whenever a user tries to go to the page. This avoids to local host the page in users machine and, having it on cloude with this strategy, save us lots of money.
--Done

Collaboration: The project will feature collaboration and study spaces in which users and professionals can share and review the courses information.

Multilingual Implementation.
Buying a domain on internet to be able to host the page correctly.