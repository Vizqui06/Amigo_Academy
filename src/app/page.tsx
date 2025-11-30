'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { ArrowRight, BookOpen, Users, Trophy, Star, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

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
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Our Vision',
      description: 'To be the leading online education platform, transforming lives through knowledge and innovation.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'The Problem We Solve',
      description: 'Bridging the educational gap through accessible technology and high-quality content for all.',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <Sparkles className="text-yellow-500" size={20} />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  #1 Learning Platform 2024
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                Learn Without
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Limits
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Your future starts here. Access world-class courses taught by industry experts. 
                Transform your career with skills that matter.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/courses"
                  className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="group-hover:translate-x-1 transition" size={20} />
                </Link>
                <Link
                  href="/team"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all border-2 border-gray-200"
                >
                  <span>Meet the Team</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, i) => (
                  <div 
                    key={i} 
                    className="text-center"
                    style={{ 
                      animation: `fade-in-up 0.5s ease-out ${i * 0.1}s forwards`,
                      opacity: 0 
                    }}
                  >
                    <stat.icon className="mx-auto mb-2 text-blue-600" size={24} />
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className={`relative ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white">
                  <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i} 
                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:scale-105 transition-transform"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <BookOpen className="text-white" size={28} />
                        </div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded-full mb-2" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                          <div className="h-3 bg-gray-100 rounded-full" style={{ width: `${Math.random() * 30 + 40}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Amigo Academy?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're more than just a learning platform. We're your partner in success.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition`}></div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 lg:p-20 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students already learning on our platform. 
              Start your journey today!
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              <span>Browse All Courses</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <BookOpen className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold">Amigo Academy</span>
          </div>
          <p className="text-gray-400">© 2024 Amigo Academy. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="/team" className="text-gray-400 hover:text-white transition">Team</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
            <Link href="/courses" className="text-gray-400 hover:text-white transition">Courses</Link>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}