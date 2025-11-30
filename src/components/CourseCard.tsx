'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BookOpen, Clock, Users, Star, TrendingUp, Zap } from 'lucide-react';

interface CourseCardProps {
  course: {
    _id: string;
    title: string;
    description: string;
    category: string;
    lessons?: any[];
    enrollmentCount?: number;
    imageUrl?: string;
  };
  enrolled?: boolean;
  onEnroll?: () => void;
}

export default function CourseCard({ course, enrolled = false, onEnroll }: CourseCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleEnroll = async () => {
    if (!session) {
      alert('Please sign in to enroll in courses');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: course._id }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Successfully enrolled!');
        if (onEnroll) onEnroll();
        router.push('/dashboard');
      } else {
        alert(data.error || 'Error enrolling in course');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error enrolling in course');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Matemáticas': 'from-blue-500 to-cyan-500',
      'Programación': 'from-purple-500 to-pink-500',
      'Ciencias': 'from-green-500 to-emerald-500',
      'Idiomas': 'from-orange-500 to-red-500',
      'Math': 'from-blue-500 to-cyan-500',
      'Programming': 'from-purple-500 to-pink-500',
      'Science': 'from-green-500 to-emerald-500',
      'Languages': 'from-orange-500 to-red-500',
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Background Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(course.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Image/Icon Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`transition-all duration-300 ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'}`}>
            <div className={`bg-gradient-to-br ${getCategoryColor(course.category)} p-6 rounded-2xl shadow-xl`}>
              <BookOpen className="text-white" size={48} />
            </div>
          </div>
        </div>
        
        {/* Floating Particles Effect */}
        {isHovered && (
          <>
            <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute top-20 right-16 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-16 left-20 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
            <Zap size={14} className="text-yellow-500" />
            <span className={`bg-gradient-to-r ${getCategoryColor(course.category)} bg-clip-text text-transparent`}>
              {course.category}
            </span>
          </span>
        </div>

        {/* Trending Badge */}
        {(course.enrollmentCount || 0) > 50 && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center space-x-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              <TrendingUp size={14} />
              <span>Trending</span>
            </span>
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-6 relative">
        <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
          {course.description}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center space-x-4 text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{course.lessons?.length || 0} lessons</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{course.enrollmentCount || 0}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="font-semibold text-gray-700">4.8</span>
          </div>
        </div>

        {/* Progress Bar (if enrolled) */}
        {enrolled && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-600 font-medium">Progress</span>
              <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                65%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: '65%' }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        {enrolled ? (
          <button 
            onClick={() => router.push(`/courses/${course._id}`)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center space-x-2"
          >
            <TrendingUp size={18} />
            <span>Continue Learning</span>
          </button>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Enrolling...</span>
              </>
            ) : (
              <>
                <BookOpen size={18} />
                <span>Enroll Now</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 rounded-2xl shadow-xl" style={{
          boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
        }}></div>
      </div>
    </div>
  );
}