'use client';

import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

export default function MotivationalQuote() {
  const [quote, setQuote] = useState({ content: '', author: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuote();
  }, []);

  async function fetchQuote() {
    try {
      const res = await fetch('https://api.quotable.io/random?tags=inspirational');
      const data = await res.json();
      setQuote({ content: data.content, author: data.author });
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({
        content: 'Education is the most powerful weapon which you can use to change the world.',
        author: 'Nelson Mandela'
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="flex items-start space-x-3">
        <Quote className="text-blue-400 flex-shrink-0" size={24} />
        <div>
          <p className="text-gray-100 italic mb-2">"{quote.content}"</p>
          <p className="text-gray-400 text-sm">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
}