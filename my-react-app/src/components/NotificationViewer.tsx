//This for Lawyer to see client requests 
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Notification {
  _id: string;
  from: { fullName: string };
  description: string;
  isRead: boolean;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

const NotificationViewer = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/notifications/${user._id}`);
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const handleRespond = async (id: string, decision: 'Accepted' | 'Rejected') => {
    try {
      await axios.patch(`http://localhost:5000/api/notifications/${id}/respond`, { decision });
      fetchNotifications();
      alert(`Request ${decision.toLowerCase()} successfully.`);
    } catch (err) {
      console.error('Error responding to request:', err);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/notifications/${id}/read`);
      fetchNotifications();
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchNotifications();
    }
  }, [user]);

  return (
    <div className="min-h-screen p-8 text-white bg-gray-950">
      <h2 className="text-3xl font-bold mb-8 text-center">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-400 text-center">No notifications found.</p>
      ) : (
        <div className="space-y-6">
          {notifications.map((notif) => (
            <div key={notif._id} className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold">{notif.from.fullName}</h3>
              <p className="text-gray-400 mt-2">{notif.description}</p>
              <p className="text-sm mt-2 text-gray-400">
                Status: <span className="font-semibold">{notif.status}</span>
              </p>
              <p className="text-sm text-gray-400">
                {notif.isRead ? 'Read' : 'Unread'}
              </p>

              {!notif.isRead && (
                <button
                  onClick={() => markAsRead(notif._id)}
                  className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Mark as Read
                </button>
              )}

              {notif.status === 'Pending' && (
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleRespond(notif._id, 'Accepted')}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRespond(notif._id, 'Rejected')}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationViewer;
