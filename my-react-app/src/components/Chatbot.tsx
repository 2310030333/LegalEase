import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Chatbot: React.FC = () => {
  const location = useLocation();
  const fullName = location.state?.fullName || 'User';

  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize with a welcome message
  useEffect(() => {
    setMessages([{ sender: 'bot', text: `Hello, ${fullName}` }]);
  }, [fullName]);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);
    setUserMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/chat', {
        message: userMessage,
      });

      const botMessage = response.data.message;
      setMessages([...newMessages, { sender: 'bot', text: botMessage }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { sender: 'bot', text: 'Sorry, I couldn’t process that request.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section className="chatbot-container bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 w-full h-full absolute inset-0 flex flex-col justify-between">
      {/* Chatbot Header */}
      <motion.div
        className="chatbot-header text-white text-2xl font-semibold mb-6 flex items-center gap-3"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <MessageCircle className="w-10 h-10 animate-pulse" />
        <span>Legal Chatbot</span>
      </motion.div>

      {/* Chatbox for Messages */}
      <motion.div
        className="chatbox flex-grow overflow-y-auto max-h-[calc(100vh-180px)] mb-4 bg-white p-4 rounded-2xl shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {messages.map((message, index) => (
          <div key={index} className={`message mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <motion.div
              className={`message-text p-3 rounded-lg inline-block max-w-xl ${
                message.sender === 'user' 
                  ? 'bg-indigo-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-black rounded-bl-none'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
            >
              {message.text}
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Message Input Area */}
      <motion.div
        className="message-input flex items-center gap-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <Input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Ask something..."
          className="flex-grow p-4 rounded-full shadow-md border-2 border-blue-500 focus:outline-none focus:border-blue-700"
        />
        <Button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white rounded-full p-4 shadow-md transition-all duration-300 hover:bg-blue-700"
        >
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default Chatbot;
