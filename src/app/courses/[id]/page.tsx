'use client';

import { JSX, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import {
  BookOpen,
  Clock,
  Users,
  Star,
  PlayCircle,
  FileText,
  CheckCircle,
  Lock,
  ArrowLeft,
  TrendingUp,
  Award,
  Download,
} from 'lucide-react';

type Lesson = {
  title: string;
  description?: string;
  type: 'video' | 'text';
  duration?: number;
  content?: {
    videoUrl?: string;
  };
};

type Resource = {
  title: string;
  url: string;
};

type Course = {
  _id: string;
  title: string;
  description: string;
  category: string;
  lessons: Lesson[];
  enrollmentCount?: number;
  resources?: Resource[];
};

type Enrollment = {
  courseId: Course;
  progress: number;
  completedLessons?: number[];
};

export default function CoursePage(): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [enrolled, setEnrolled] = useState<boolean>(false);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [currentLesson, setCurrentLesson] = useState<number>(0);

  useEffect(() => {
    if (params.id) {
      fetchCourse();
      checkEnrollment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  async function fetchCourse() {
    try {
      const response = await fetch(`/api/courses/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setCourse(data.course as Course);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  }

  async function checkEnrollment() {
    if (!session) return;
    try {
      const response = await fetch('/api/user/enrolled');
      const data = await response.json();
      if (data.success) {
        const found = (data.courses as Enrollment[]).find(
          (c) => c.courseId._id === params.id
        );
        if (found) {
          setEnrolled(true);
          setCompletedLessons(found.completedLessons || []);
        }
      }
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  }

  async function handleEnroll() {
    if (!session) {
      alert('Please sign in to enroll');
      return;
    }
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: params.id }),
      });
      const data = await response.json();
      if (data.success) {
        setEnrolled(true);
        alert('Successfully enrolled!');
      } else {
        alert(data.error || 'Error enrolling');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error enrolling in course');
    }
  }

  async function markLessonComplete(lessonIndex: number) {
    if (!enrolled || !course) return;
    try {
      const response = await fetch('/api/progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: params.id,
          lessonIndex,
          totalLessons: course.lessons.length,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCompletedLessons((prev) => [...prev, lessonIndex]);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-32 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">Course Not Found</h1>
          <button
            onClick={() => router.push('/courses')}
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const progress = course.lessons.length > 0
    ? Math.round((completedLessons.length / course.lessons.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      <div className="container mx-auto px-4 py-16 space-y-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Course Header */}
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 bg-opacity-80 p-8 text-white">
            <div className="inline-flex items-center space-x-2 bg-blue-700 bg-opacity-90 px-3 py-1 rounded-full mb-4">
              <BookOpen size={16} />
              <span className="text-sm">{course.category}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">{course.title}</h1>
            <p className="text-gray-200 mb-4">{course.description}</p>
            <div className="flex flex-wrap gap-6 text-gray-200">
              <div className="flex items-center space-x-2">
                <Clock size={20} />
                <span>{course.lessons.length} Lessons</span>
              </div>
              {course.enrollmentCount !== undefined && (
                <div className="flex items-center space-x-2">
                  <Users size={20} />
                  <span>{course.enrollmentCount} Students</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Star size={20} />
                <span>Rating: 4.8</span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-6 border-t border-gray-700">
            {enrolled ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex-1 max-w-md">
                    <div className="flex justify-between mb-2 text-gray-200">
                      <span className="text-sm font-semibold">Progress</span>
                      <span className="text-sm font-bold text-blue-400">
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  {progress === 100 && (
                    <div className="flex items-center space-x-2 bg-green-500 bg-opacity-20 text-green-200 px-4 py-2 rounded-full">
                      <Award size={20} />
                      <span className="font-semibold">Completed!</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition"
              >
                <TrendingUp className="inline mr-2" size={20} />
                <span>Enroll Now</span>
              </button>
            )}
          </div>
        </div>

        {/* Course Content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Course Content</h2>
          {course.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(index);
            const isLocked = !enrolled && index > 0;

            return (
              <div
                key={index}
                className={`border rounded-lg p-4 transition-all ${
                  isLocked
                    ? 'border-gray-700 bg-gray-800 opacity-60'
                    : isCompleted
                    ? 'border-green-500 bg-green-900 bg-opacity-20'
                    : 'border-gray-700 bg-gray-800 hover:border-blue-500 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center ${
                    isLocked
                      ? 'bg-gray-600'
                      : isCompleted
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  }`}>
                    {isLocked ? (
                      <Lock className="text-white" size={20} />
                    ) : isCompleted ? (
                      <CheckCircle className="text-white" size={20} />
                    ) : lesson.type === 'video' ? (
                      <PlayCircle className="text-white" size={20} />
                    ) : (
                      <FileText className="text-white" size={20} />
                    )}
                  </div>

                  <div className="flex-1 text-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{lesson.title}</h3>
                      {lesson.duration && (
                        <span className="text-sm text-gray-300 flex items-center space-x-1 ml-4">
                          <Clock size={14} />
                          <span>{lesson.duration} min</span>
                        </span>
                      )}
                    </div>
                    {lesson.description && (
                      <p className="text-gray-300 text-sm mb-2">{lesson.description}</p>
                    )}
                    {!isLocked && enrolled && (
                      <div className="flex items-center space-x-3 mt-3 text-sm">
                        <button
                          onClick={() => setCurrentLesson(index)}
                          className="text-blue-400 hover:text-blue-500 flex items-center space-x-1"
                        >
                          <PlayCircle size={16} />
                          <span>View Lesson</span>
                        </button>
                        {!isCompleted && (
                          <button
                            onClick={() => markLessonComplete(index)}
                            className="text-green-400 hover:text-green-500 flex items-center space-x-1"
                          >
                            <CheckCircle size={16} />
                            <span>Mark Complete</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resources */}
        {course.resources && course.resources.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Additional Resources</h2>
            {course.resources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-gray-800 rounded-md hover:bg-gray-700 transition"
              >
                <Download className="text-blue-400" size={20} />
                <span className="text-gray-200">{res.title}</span>
              </a>
            ))}
          </div>
        )}

        {/* Video Player */}
        {enrolled && course.lessons[currentLesson]?.content?.videoUrl && (
          <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              {course.lessons[currentLesson].title}
            </h2>
            <div className="aspect-video bg-black rounded-md overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={course.lessons[currentLesson].content.videoUrl.replace(
                  'watch?v=',
                  'embed/'
                )}
                title={course.lessons[currentLesson].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
