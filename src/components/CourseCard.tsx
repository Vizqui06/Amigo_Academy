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

  const handleEnroll = async () => {
    if (!session) {
      alert('Please sign in to enroll in courses');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  return (
    <div className="group relative bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Header / Icon or Image */}
      <div className="h-44 bg-gray-700 flex items-center justify-center">
        <BookOpen className="text-blue-400" size={48} />
      </div>

      {/* Body */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description}</p>

        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <div className="flex items-center space-x-2">
            <Clock size={14} />
            <span>{(course.lessons?.length || 0)} lessons</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users size={14} />
            <span>{course.enrollmentCount || 0}</span>
          </div>
        </div>

        <div className="flex items-center mb-6 text-sm text-gray-400">
          <Star size={14} fill="currentColor" className="text-yellow-400" />
          <span className="ml-1 font-semibold">4.8</span>
        </div>

        {enrolled ? (
          <button
            onClick={() => router.push(`/courses/${course._id}`)}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Continue Learning
          </button>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-60"
          >
            {loading ? 'Enrolling...' : 'Enroll Now'}
          </button>
        )}
      </div>
    </div>
  );
}
