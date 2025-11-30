'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { BookOpen, TrendingUp, Award, Clock, Target, Zap, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
  }, [status]);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch('/api/user/enrolled');
      const data = await response.json();
      
      if (data.success) {
        setEnrolledCourses(data.courses);
        setStats({
          totalCourses: data.courses.length,
          completedCourses: data.courses.filter((c: any) => c.progress === 100).length,
          hoursLearned: data.courses.length * 12,
          currentStreak: 5,
        });
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
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

  const statCards = [
    { icon: BookOpen, label: 'Enrolled Courses', value: stats.totalCourses, color: 'from-blue-500 to-cyan-500' },
    { icon: Award, label: 'Completed', value: stats.completedCourses, color: 'from-purple-500 to-pink-500' },
    { icon: Clock, label: 'Hours Learned', value: stats.hoursLearned, color: 'from-green-500 to-emerald-500' },
    { icon: Zap, label: 'Day Streak', value: stats.currentStreak, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-32">
        {/* Welcome Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-3">
            Welcome back,
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {session?.user?.name?.split(' ')[0]}! 👋
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Continue your learning journey where you left off
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
              style={{
                animation: `fade-in-up 0.5s ease-out ${i * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition`}></div>
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        {enrolledCourses.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-6">
              <BookOpen size={48} className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Start Your Learning Journey</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't enrolled in any courses yet. Explore our catalog and start learning today!
            </p>
            <button
              onClick={() => router.push('/courses')}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              <span>Browse Courses</span>
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">My Courses</h2>
              <button
                onClick={() => router.push('/courses')}
                className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-purple-600 transition"
              >
                <span>Browse More</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((enrollment, index) => (
                <div
                  key={enrollment.courseId._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 group"
                  style={{
                    animation: `fade-in-up 0.5s ease-out ${index * 0.1}s forwards`,
                    opacity: 0,
                  }}
                >
                  {/* Header with gradient */}
                  <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-500 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                    </div>
                    <div className="relative h-full flex items-center justify-center">
                      <BookOpen size={40} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition">
                      {enrollment.courseId.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {enrollment.courseId.description}
                    </p>
                    
                    {/* Progress Section */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 font-medium flex items-center space-x-1">
                          <Target size={14} />
                          <span>Progress</span>
                        </span>
                        <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {enrollment.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Continue Button */}
                    <button
                      onClick={() => router.push(`/courses/${enrollment.courseId._id}`)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <TrendingUp size={18} />
                      <span>Continue Learning</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}