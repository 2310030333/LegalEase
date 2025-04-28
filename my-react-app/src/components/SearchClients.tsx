import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { motion } from 'framer-motion';
import { Loader2, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
interface Client {
  _id: string;
  fullName: string;
  username: string;
  phone: string;
  caseDetails?: string;
}

const LawyerClientsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lawyerId } = location.state as { lawyerId: string };

  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/clients?lawyerId=${lawyerId}`);
        const clientsData = Array.isArray(response.data) ? response.data : [];
        setClients(clientsData);
        setFilteredClients(clientsData);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [lawyerId]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredClients(clients);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredClients(
        clients.filter(client =>
          client.fullName.toLowerCase().includes(term) ||
          client.username.toLowerCase().includes(term) ||
          client.phone.includes(term)
        )
      );
    }
  }, [searchTerm, clients]);

  const handleSendVideoConferenceInvite = async (phone: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-video-conference', { phoneNumber: phone });
      console.log(response.data.message);
      alert('Video Conference invite sent!');
    } catch (error) {
      console.error('Error sending invite:', error);
      alert('Failed to send video conference invite.');
    }
  
    // Corrected URL without the extra period at the end
    window.location.href = 'https://video-calling-app-1-donw.onrender.com'; 
  };
  

  return (
    <motion.div
      className="min-h-screen p-6 flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4">
        <Search className="text-gray-500" />
        <Input
          placeholder="Search clients by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md bg-white text-gray-800 border border-gray-300 rounded-md p-2"
        />
      </div>

      {loading ? (
        <div className="flex justify-center mt-20">
          <Loader2 className="animate-spin h-12 w-12 text-primary" />
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">No clients found.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map(client => (
            <motion.div
              key={client._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-5 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-300 bg-white">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{client.fullName}</h2>
                <p className="text-gray-600 mb-1"><strong>Email:</strong> {client.username}</p>
                <p className="text-gray-600 mb-1"><strong>Phone:</strong> {client.phone}</p>
                {client.caseDetails && (
                  <p className="text-gray-500 mt-2 text-sm">{client.caseDetails}</p>
                )}
                <button
                  onClick={() => handleSendVideoConferenceInvite(client.phone)}
                  className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Video Conference
                </button>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default LawyerClientsPage;
