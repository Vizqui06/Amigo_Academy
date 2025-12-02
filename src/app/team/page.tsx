'use client';

import Navbar from '@/components/Navbar';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  specialty: string;
};

export default function TeamPage() {
  const team: TeamMember[] = [
    { id: 1, name: 'Santiago Aguilar', role: 'Developer', specialty: 'Programming' },
    { id: 2, name: 'Leonardo Vizcaíno', role: 'Developer', specialty: 'Programming' },
    { id: 3, name: 'Adrian Gallardo', role: 'Developer', specialty: 'Programming' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white text-center">
          Nuestro Equipo
        </h1>
        <p className="text-center text-gray-300 mb-12 max-w-xl mx-auto">
          Conoce a los expertos que hacen posible tu aprendizaje
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map(member => (
            <div 
              key={member.id} 
              className="bg-gray-800 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition"
            >
              <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold mb-1 text-white">{member.name}</h3>
              <p className="text-blue-400 font-medium mb-2">{member.role}</p>
              <p className="text-gray-300 text-sm">{member.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
