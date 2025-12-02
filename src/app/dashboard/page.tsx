'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import {
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  Zap,
  ArrowRight
} from 'lucide-react';

type Enrollment = {
  courseId: {
    _id: string;
    title: string;
    description: string;
  };
  progress: number;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    hoursLearned: 0,
    currentStreak: 5,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      fetchEnrolledCourses();
    }
  }, [status, router]);

  async function fetchEnrolledCourses() {
    try {
      const response = await fetch('/api/user/enrolled');
      const data = await response.json();
      if (data.success) {
        const list: Enrollment[] = data.courses;
        setEnrolledCourses(list);
        setStats({
          totalCourses: list.length,
          completedCourses: list.filter(c => c.progress === 100).length,
          hoursLearned: list.length * 12,
          currentStreak: 5,
        });
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-32 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        {/* Welcome Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-white">
            Welcome back,
            <span className="block text-blue-400">
              {session?.user?.name?.split(' ')[0]}!
            </span>
          </h1>
          <p className="text-lg text-gray-300">
            Continue your learning journey where you left off
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Cards de estadísticas */}
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <BookOpen className="mx-auto mb-2 text-blue-400" size={28} />
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <div className="text-sm text-gray-300">Enrolled Courses</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <Award className="mx-auto mb-2 text-blue-400" size={28} />
            <div className="text-2xl font-bold">{stats.completedCourses}</div>
            <div className="text-sm text-gray-300">Completed</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <Clock className="mx-auto mb-2 text-blue-400" size={28} />
            <div className="text-2xl font-bold">{stats.hoursLearned}</div>
            <div className="text-sm text-gray-300">Hours Learned</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <Zap className="mx-auto mb-2 text-blue-400" size={28} />
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <div className="text-sm text-gray-300">Day Streak</div>
          </div>
        </div>

        {/* Main Content: si no hay cursos inscritos */}
        {enrolledCourses.length === 0 ? (
          <div className="bg-gray-800 rounded-lg shadow-lg p-12 text-center">
            <BookOpen size={48} className="mx-auto mb-4 text-blue-400" />
            <h3 className="text-2xl font-bold mb-3 text-white">Start Your Learning Journey</h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              You haven't enrolled in any courses yet. Explore our catalog and start learning today!
            </p>
            <button
              onClick={() => router.push('/courses')}
              className="inline-flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition"
            >
              <span>Browse Courses</span>
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">My Courses</h2>
              <button
                onClick={() => router.push('/courses')}
                className="text-blue-400 font-medium hover:text-blue-500 transition"
              >
                Browse More <ArrowRight size={16} className="inline ml-1" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((enrollment) => (
                <div key={enrollment.courseId._id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <div className="h-32 bg-blue-500 bg-opacity-80 flex items-center justify-center">
                    <BookOpen className="text-white" size={36} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {enrollment.courseId.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {enrollment.courseId.description}
                    </p>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300 font-medium flex items-center space-x-1">
                          <Clock size={14} />
                          <span>Progress</span>
                        </span>
                        <span className="text-sm font-bold text-blue-400">
                          {enrollment.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => router.push(`/courses/${enrollment.courseId._id}`)}
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
