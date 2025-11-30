'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { BookOpen, Menu, X, User, LogOut, LayoutDashboard, GraduationCap } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <GraduationCap className="text-white" size={28} />
              </div>
            </div>
            <span className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${
              scrolled ? '' : 'text-white'
            }`}>
              Amigo Academy
            </span>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 rounded-lg transition ${
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`font-medium transition hover:scale-105 ${
                scrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white hover:text-blue-200'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/courses" 
              className={`font-medium transition hover:scale-105 ${
                scrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white hover:text-blue-200'
              }`}
            >
              Courses
            </Link>
            <Link 
              href="/team" 
              className={`font-medium transition hover:scale-105 ${
                scrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white hover:text-blue-200'
              }`}
            >
              Team
            </Link>
            <Link 
              href="/contact" 
              className={`font-medium transition hover:scale-105 ${
                scrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white hover:text-blue-200'
              }`}
            >
              Contact
            </Link>
            
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all hover:scale-105"
                >
                  <User size={18} />
                  <span className="font-medium">{session.user?.name?.split(' ')[0]}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100">
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <LayoutDashboard size={18} className="text-gray-600" />
                      <span className="text-gray-700">Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition w-full text-left"
                    >
                      <LogOut size={18} className="text-gray-600" />
                      <span className="text-gray-700">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in bg-white rounded-lg shadow-lg p-4 mt-2">
            <Link 
              href="/" 
              className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/courses" 
              className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              href="/team" 
              className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Team
            </Link>
            <Link 
              href="/contact" 
              className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {session && (
              <Link 
                href="/dashboard" 
                className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {!session && (
              <button
                onClick={() => signIn('google')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}