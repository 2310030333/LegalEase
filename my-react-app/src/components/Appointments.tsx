import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchLawyer.css';

interface Appointment {
  _id: string;
  lawyer: { fullName: string };
  status: string;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/appointments/client/${user._id}`);
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchAppointments();
    }
  }, [user]);

  return (
    <div className="animated-wave-gradient min-h-screen p-8 text-white">
      <button
        onClick={() => navigate('/clientdashboard')}
        className="mb-6 p-2 bg-gray-800 rounded hover:bg-gray-700 transition flex items-center"
        aria-label="Go to client dashboard"
      >
        <Home className="w-6 h-6 text-white" />
      </button>

      <h2 className="text-3xl font-bold mb-8 text-center">Your Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-400 text-center">No appointments found.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((app) => (
            <div key={app._id} className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold">{app.lawyer.fullName}</h3>
              <p className="text-gray-400 mt-2">Status: {app.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
