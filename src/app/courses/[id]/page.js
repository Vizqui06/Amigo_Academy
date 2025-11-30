'use client';

import { useEffect, useState } from 'react';
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
  Download
} from 'lucide-react';

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    if (params.id) {
      fetchCourse();
      checkEnrollment();
    }
  }, [params.id]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setCourse(data.course);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (!session) return;
    
    try {
      const response = await fetch('/api/user/enrolled');
      const data = await response.json();
      
      if (data.success) {
        const isEnrolled = data.courses.some(c => c.courseId._id === params.id);
        setEnrolled(isEnrolled);
        
        if (isEnrolled) {
          const enrollment = data.courses.find(c => c.courseId._id === params.id);
          setCompletedLessons(enrollment.completedLessons || []);
        }
      }
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };

  const handleEnroll = async () => {
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
  };

  const markLessonComplete = async (lessonIndex) => {
    if (!enrolled) return;

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
        setCompletedLessons([...completedLessons, lessonIndex]);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Navbar />
        <div className="container mx-auto px-4 py-32">
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <button
            onClick={() => router.push('/courses')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const progress = completedLessons.length > 0 
    ? Math.round((completedLessons.length / course.lessons.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-32">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Course Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <BookOpen size={18} />
                <span className="font-semibold">{course.category}</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
                {course.title}
              </h1>
              
              <p className="text-xl text-white/90 mb-6 max-w-3xl">
                {course.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Clock size={20} />
                  <span>{course.lessons?.length || 0} Lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={20} />
                  <span>{course.enrollmentCount || 0} Students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star size={20} fill="currentColor" />
                  <span>4.8 Rating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-6 border-b">
            {enrolled ? (
              <div className="flex items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Your Progress</span>
                    <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                {progress === 100 && (
                  <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
                    <Award size={20} />
                    <span className="font-semibold">Completed!</span>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center space-x-2"
              >
                <TrendingUp size={24} />
                <span>Enroll Now</span>
              </button>
            )}
          </div>

          {/* Course Content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>
            
            <div className="space-y-4">
              {course.lessons?.map((lesson, index) => {
                const isCompleted = completedLessons.includes(index);
                const isLocked = !enrolled && index > 0;

                return (
                  <div
                    key={index}
                    className={`relative border-2 rounded-xl p-4 transition-all ${
                      isLocked 
                        ? 'border-gray-200 bg-gray-50 opacity-60' 
                        : isCompleted
                        ? 'border-green-500 bg-green-50'
                        : 'border-blue-200 bg-white hover:border-blue-400 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                        isLocked
                          ? 'bg-gray-300'
                          : isCompleted
                          ? 'bg-green-500'
                          : 'bg-gradient-to-br from-blue-500 to-purple-500'
                      }`}>
                        {isLocked ? (
                          <Lock className="text-white" size={24} />
                        ) : isCompleted ? (
                          <CheckCircle className="text-white" size={24} />
                        ) : lesson.type === 'video' ? (
                          <PlayCircle className="text-white" size={24} />
                        ) : (
                          <FileText className="text-white" size={24} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">
                              Lesson {index + 1}: {lesson.title}
                            </h3>
                            {lesson.description && (
                              <p className="text-gray-600 text-sm mt-1">
                                {lesson.description}
                              </p>
                            )}
                          </div>
                          {lesson.duration && (
                            <span className="text-sm text-gray-500 flex items-center space-x-1 ml-4">
                              <Clock size={16} />
                              <span>{lesson.duration} min</span>
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        {enrolled && !isLocked && (
                          <div className="flex items-center space-x-3 mt-3">
                            <button
                              onClick={() => setCurrentLesson(index)}
                              className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center space-x-1"
                            >
                              <PlayCircle size={16} />
                              <span>View Lesson</span>
                            </button>
                            {!isCompleted && (
                              <button
                                onClick={() => markLessonComplete(index)}
                                className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center space-x-1"
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
          </div>

          {/* Resources */}
          {course.resources && course.resources.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
              <div className="space-y-2">
                {course.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:shadow-md transition"
                  >
                    <Download size={20} className="text-blue-600" />
                    <span className="text-gray-700 font-medium">{resource.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Video Player (if enrolled and lesson selected) */}
        {enrolled && course.lessons[currentLesson] && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {course.lessons[currentLesson].title}
            </h2>
            {course.lessons[currentLesson].content?.videoUrl && (
              <div className="aspect-video bg-black rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={course.lessons[currentLesson].content.videoUrl.replace('watch?v=', 'embed/')}
                  title={course.lessons[currentLesson].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}