// Types for the application

export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'admin';
  googleId?: string;
  enrolledCourses: EnrolledCourse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EnrolledCourse {
  courseId: Course | string;
  progress: number;
  completedLessons: number[];
  enrolledAt: Date;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  lessons: Lesson[];
  instructor?: User | string;
  isPublished: boolean;
  enrollmentCount: number;
  resources?: Resource[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  _id?: string;
  title: string;
  description?: string;
  type: 'video' | 'text' | 'quiz';
  content: {
    videoUrl?: string;
    textContent?: string;
    embedCode?: string;
  };
  duration?: number;
  order: number;
}

export interface Resource {
  title: string;
  url: string;
  type: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'read' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Props types for components
export interface CourseCardProps {
  course: Course;
  enrolled?: boolean;
  onEnroll?: () => void;
}

export interface NavbarProps {
  // Add props if needed
}

export interface ProviderProps {
  children: React.ReactNode;
}