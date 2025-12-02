'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="bg-blue-500 p-2 rounded-md">
            <BookOpen className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-white">Amigo Academy</span>
        </div>
        <p className="text-gray-400">© 2024 Amigo Academy. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <Link href="/team" className="hover:text-white transition">Team</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
          <Link href="/courses" className="hover:text-white transition">Courses</Link>
        </div>
      </div>
    </footer>
  );
}
