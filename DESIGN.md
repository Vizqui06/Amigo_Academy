# Design Document - Amigo Academy

## Table of Contents
1. Overview
3. System Architecture
4. Database Design
5. API Design
6. User Interface Design

---

## Overview

### Purpose
The purpose of this page design is to create an intuitive, accessible, and user-centered interface that enhances the learning experience for all users. By prioritizing clarity, simplicity, and efficient navigation, the design aims to support students in easily discovering, accessing, and engaging with educational content. This structure ensures that learning materials are presented in an organized and visually coherent manner, enabling users to focus on acquiring knowledge without unnecessary friction or confusion.

### System Objectives
1. Provide free access to quality educational content
2. Offer an intuitive and accessible user experience
3. Enable learning progress tracking
4. Facilitate course creation and management


### Target Users
  The platform is designed for a broad global audience, focusing on individuals who face barriers to traditional education. Key target users include:
- **1. Students of All Ages**
Learners seeking accessible, high-quality education, including children, youth, and adults pursuing academic or personal development.
- **2. Underserved Populations**
People affected by poverty, geographic isolation, conflict, disability, or other barriers that limit access to formal education.
- **3. Educators and Volunteers**
Teachers, mentors, and professionals who want to contribute content, support learners, and participate in global educational collaboration.

- **4. Lifelong Learners**
Adults and professionals looking to gain new skills, improve career opportunities, or engage in continuous learning.

- **5. Community Organizations**
Schools, NGOs, and local programs that can use the platform as a free educational resource.

---

## Technology Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript

**Backend:**
- Next.js API Routes
- Node.js
- Mongoose

**Database:**
- MongoDB Atlas

**Authentication:**
- NextAuth
- Google OAuth 2.0

**Deployment:**
- Render (Backend + Frontend)
- MongoDB Atlas (Database)

---

## Database Schemas

## User Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| name | String | Yes | - | User's full name |
| email | String | Yes | - | User's email (unique) |
| image | String | No | null | Profile picture URL |
| role | String | No | 'student' | 'student', 'instructor', 'admin' |
| enrolledCourses | [ObjectId] | No | [] | References to Course |
| enrolledat | Date | Auto | Date.now | Creation timestamp |
| updatedAt | Date | Auto | Date.now | Update timestamp |

---

## Course Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| title | String | Yes | - | Course title |
| description | String | Yes | - | Course description |
| instructor | ObjectId | Yes | - | Reference to User |
| category | String | Yes | - | Course category |
| thumbnail | String | No | null | Course image URL |
| lessons | [Lesson] | No | [] | Array of lessons |
| enrollmentCount | [ObjectId] | No | [] | References to User |
| createdAt | Date | Auto | Date.now | Creation timestamp |
| updatedAt | Date | Auto | Date.now | Update timestamp |

### Lesson (Embedded)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | Yes | Lesson title |
| content | String | Yes | Lesson content |
| videoUrl | String | No | Video URL |
| duration | Number | No | Duration (minutes) |
| order | Number | Yes | Lesson order |

---

## Contact Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| name | String | Yes | - | Sender's name |
| email | String | Yes | - | Sender's email |
| message | String | Yes | - | Message content |
| status | String | No | 'pending' | 'pending', 'read', 'responded' |
| createdAt | Date | Auto | Date.now | Creation timestamp |
| updatedAt | Date | Auto | Date.now | Update timestamp |

---

##  API Design

### RESTful Principles

- Use GET, POST, PUT, DELETE
- Resource-based endpoints
- JSON as exchange format

### Endpoint Structure

# API Endpoints

## Authentication
```
GET    /api/auth/[...nextauth]     # NextAuth handler (signin, callback, session)
POST   /api/auth/[...nextauth]     # NextAuth handler (signin, signout)
```

## Contact
```
GET    /api/contact                # Get contact messages (admin only)
POST   /api/contact                # Send contact message
```

## Courses
```
GET    /api/courses                # List all courses
POST   /api/courses                # Create new course (auth required)
GET    /api/courses/[id]           # Get specific course by ID
```

## Enrollment
```
POST   /api/enroll                 # Enroll user in a course (auth required)
```

## Progress
```
PUT    /api/progress               # Update progress (auth required)
```

## User
```
GET    /api/user/enrolled          # Get user's enrolled courses (auth required)
```

### Authentication and Authorization

**Authentication Flow:**

1. User clicks "Sign in"
2. Redirect to Google OAuth
3. Google validates credentials
4. Google returns user data
5. NextAuth creates session and redirect to Home Page (Using JWT token)


## User Interface Design

### Main Components

#### 1. Navbar
- Logo on the left
- Navigation links on right
- Login/profile button on the right
- Responsive with hamburger menu on mobile

#### 2. Course Card
- Thumbnail image on top (if its added)
- Title and description
- Metadata
- Action button (View course / Enrroll or Continue)
- Progress bar if enrolled

#### 3. Dashboard
- Sidebar with navigation
- Main area with statistics
- Grid of enrolled courses

#### 4. Contact Form
- Clear labels
- Loading state

### Responsive Design

**Strategy:**
- Computer first approach
- Adaptive grid
- Collapsible navigation

### Accessibility

- Color contrast
- Interactive elements
- Visible focus indicators

---

##  User Flows

### Registration and Enrollment Flow

```
User → Click "Sign in with Google"
   ↓
Google OAuth → Authentication
   ↓
NextAuth → Create session
   ↓
Redirect → Dashboard
   ↓
Browse courses → Select course
   ↓
Click "Enroll" → Update DB
   ↓
Access course → View lessons
   ↓
Complete lesson → Update progress
```
