import React from 'react';
import { useNavigate } from '@tanstack/react-router';

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sunshine-50 to-grass-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-fun border-4 border-cherry-200 p-8 max-w-md text-center">
        <span className="text-6xl">🚫</span>
        <h2 className="text-2xl font-bold font-fredoka text-cherry-600 mt-4">Page Not Available</h2>
        <p className="text-gray-600 font-nunito mt-2">
          The Teacher Dashboard has been removed. Please use the Parent Dashboard instead.
        </p>
        <button
          onClick={() => navigate({ to: '/' })}
          className="mt-6 px-6 py-3 bg-sunshine-400 text-white rounded-xl font-bold font-nunito hover:bg-sunshine-500 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default TeacherDashboard;
