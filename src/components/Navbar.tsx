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
          ? 'bg-gray-800/95 shadow-lg'
          : 'bg-gray-900/80'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-500 p-2 rounded-md">
              <GraduationCap className="text-white" size={28} />
            </div>
            <span className="text-2xl font-bold text-white">Amigo Academy</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-100 hover:bg-gray-700 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-medium text-gray-100 hover:text-blue-400 transition">
              Home
            </Link>
            <Link href="/courses" className="font-medium text-gray-100 hover:text-blue-400 transition">
              Courses
            </Link>
            <Link href="/team" className="font-medium text-gray-100 hover:text-blue-400 transition">
              Team
            </Link>
            <Link href="/contact" className="font-medium text-gray-100 hover:text-blue-400 transition">
              Contact
            </Link>

            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  <User size={18} />
                  <span className="font-medium">{session.user?.name?.split(' ')[0]}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-gray-100 rounded-md shadow-lg py-2 border border-gray-700">
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 transition"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <LayoutDashboard size={18} className="text-gray-200" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 transition"
                    >
                      <LogOut size={18} className="text-gray-200" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="bg-blue-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-600 transition"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-gray-800 text-gray-100 rounded-lg shadow-lg p-4 mt-2">
            <Link href="/" className="block py-2 px-4 rounded hover:bg-gray-700 transition" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/courses" className="block py-2 px-4 rounded hover:bg-gray-700 transition" onClick={() => setMobileMenuOpen(false)}>
              Courses
            </Link>
            <Link href="/team" className="block py-2 px-4 rounded hover:bg-gray-700 transition" onClick={() => setMobileMenuOpen(false)}>
              Team
            </Link>
            <Link href="/contact" className="block py-2 px-4 rounded hover:bg-gray-700 transition" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            {session && (
              <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700 transition" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
            )}
            {!session && (
              <button
                onClick={() => signIn('google')}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
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
