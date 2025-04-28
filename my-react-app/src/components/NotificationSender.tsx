import React, { useState } from 'react';
import axios from 'axios';

interface NotificationSenderProps {
  lawyerId: string;
}

const NotificationSender: React.FC<NotificationSenderProps> = ({ lawyerId }) => {
  const [description, setDescription] = useState('');
  let client = null;
  try {
    const userString = localStorage.getItem('user');
    if (userString) {
      client = JSON.parse(userString);
    }
  } catch (err) {
    console.error('Failed to parse user from localStorage', err);
  }

  const handleSendNotification = async () => {
    if (!description.trim()) {
      alert('Please enter a description!');
      return;
    }

    if (!client || !client._id) {
      alert('User not logged in or invalid user data.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/notifications/send', {
        from: client._id,      // Client ID (sender)
        to: lawyerId,          // Lawyer ID (receiver)
        description,
      });

      alert('Notification sent successfully!');
      setDescription('');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification.');
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl">
      <h2 className="text-2xl mb-4 font-bold">Send a Connection Request</h2>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-4 rounded bg-gray-800 text-white focus:outline-none"
        placeholder="Enter message to lawyer..."
        rows={4}
      />

      <button
        onClick={handleSendNotification}
        className="mt-4 px-6 py-3 bg-primary hover:bg-primary/80 rounded text-white font-semibold"
      >
        Send Notification
      </button>
    </div>
  );
};

export default NotificationSender;
