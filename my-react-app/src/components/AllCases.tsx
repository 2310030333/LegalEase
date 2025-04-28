import React from 'react';
import { Search, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllCases = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 text-white bg-gray-950">
      <button
              onClick={() => navigate('/clientdashboard')}
              className="mb-6 p-2 bg-gray-800 rounded hover:bg-gray-700 transition flex items-center"
              aria-label="Go to client dashboard"
            >
              <Home className="w-6 h-6 text-white" />
      </button>
      <div className="text-xl">📂 All Cases Page</div>
    </div>
  );
};

export default AllCases;
