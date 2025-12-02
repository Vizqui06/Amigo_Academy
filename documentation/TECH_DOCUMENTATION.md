AMIGO'S ACADEMY 
This document outlines the frontend implementation logic and backend architecture for the Amigo's Academy Project. 

WEBSITE ARCHITECTURE
The website follows the common architecture and appropriate structure for a MERN Stack Project.

The repository follows a modular structure centered around a src/ directory, which organizes the project’s core source files. Version control is handled through Git and GitHub, enabling collaboration, contribution tracking, and cloud-based code management.

Frontend Technologies
The frontend of Amigo Academy is built using a modern, flexible web development stack focused on maintainability, responsiveness, and type safety.

TypeScript
Represents the majority of the codebase.
Adds static typing, better tooling, and safer code compared to plain JavaScript.
Helps maintain clean architecture and improves scalability.

JavaScript
Used alongside TypeScript for scripts and certain logic modules.
Provides compatibility and flexibility for quick prototypes or utility functions.

CSS (Custom Styles)
Custom CSS files are used to implement unique styles across the project.
Ensures full control over layout, spacing, and component-level appearance.

Tailwind CSS
The project includes a tailwind.config.js file, indicating active integration.
Tailwind provides:
Utility-first CSS classes
Fast styling without writing custom CSS for every component
Highly responsive and consistent design
Greatly accelerates UI development while keeping styles maintainable.

PostCSS
Managed through postcss.config.js.
Acts as a CSS processor for:
Transforming Tailwind utilities
Applying vendor prefixes
Optimizing production CSS builds.

Backend Technologies
The Project follows the MERN Stack and Full Stack Technologies which include:
MongoDB: for saving data as users, courses enrolled and courses in general.
We save messages, users, progress, etc.
Express: Paired with Node.js for routing and backend structure, besides controlling middleware.
React: Frontend Library used to build the dynamic User interface.
Node.js: Environment that allows us to execute the JavaScript from the Server side. Allowing Express and Backend to function properly.

 