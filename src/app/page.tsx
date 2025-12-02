'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Trophy, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import MotivationalQuote from '@/components/MotivationalQuote';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Students' },
    { icon: BookOpen, value: '50+', label: 'Quality Courses' },
    { icon: Trophy, value: '95%', label: 'Success Rate' },
    { icon: Star, value: '4.9/5', label: 'Average Rating' },
  ];

  const features = [
    {
      title: 'Our Mission',
      description: 'Democratize quality education, making it accessible to everyone regardless of location or resources.',
    },
    {
      title: 'Our Vision',
      description: 'To be the leading online education platform, transforming lives through knowledge and innovation.',
    },
    {
      title: 'The Problem We Solve',
      description: 'Bridging the educational gap through accessible technology and high-quality content for all.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Learn Without <br />
              <span className="text-blue-400">Limits</span>
            </h1>
            <MotivationalQuote />
            <p className="text-lg text-gray-300 leading-relaxed">
              Your future starts here. Access world-class courses taught by industry experts. Transform your career with skills that matter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition"
              >
                <span>Explore Courses</span>
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center justify-center bg-gray-800 text-gray-200 px-6 py-3 rounded-md font-semibold border border-gray-700 hover:bg-gray-700 transition"
              >
                <span>Meet the Team</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="mx-auto mb-2 text-blue-400" size={24} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional right visual — simple */}
          <div className="hidden lg:block">
            <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
              <BookOpen className="text-blue-400" size={64} />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose <span className="text-blue-400">Amigo Academy?</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We’re more than just a learning platform. We’re your partner in success.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-blue-500 rounded-lg p-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of students already learning on our platform. Start your journey today!
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center bg-white text-blue-500 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            <span>Browse All Courses</span>
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
