'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';

type Course = {
  _id: string;
  title: string;
  description: string;
  category: string;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Math', 'Programming', 'Science', 'Languages', 'Engineering', 'Design'];

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchTerm, selectedCategory, courses]);

  async function fetchCourses() {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      const list: Course[] = data.courses || [];
      setCourses(list);
      setFilteredCourses(list);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  }

  function filterCourses() {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    setFilteredCourses(filtered);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />

      {/* Header Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-white">
            Discover Your <span className="text-blue-400">Perfect Course</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
            Choose from our curated collection of high-quality courses taught by industry experts.
          </p>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 text-gray-100 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-700 rounded mb-4"></div>
                <div className="h-6 bg-gray-700 rounded mb-3"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <BookOpen size={64} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-gray-200">No courses found</h3>
            <p className="mb-6">Try adjusting your search or filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-100">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Available
              </h2>
              <div className="flex items-center space-x-2 text-gray-400">
                <Filter size={18} />
                <span className="text-sm">Filter: {selectedCategory}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <CourseCard key={course._id} course={course} className="bg-gray-800 text-gray-100" />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
