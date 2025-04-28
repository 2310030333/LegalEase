import React from 'react';
import { useEffect, useState} from 'react';
import { Button } from "./ui/button";
import { LayoutDashboard, ShoppingCart, Users, FileText, ListChecks, XCircle } from 'lucide-react';
import { cn } from "../lib/utils";
import { useLocation } from 'react-router-dom'; // 👈 import useLocation
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
interface SidebarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state as { userId: string };
    console.log('Received userId:', userId);
    
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  console.log(userId, "hello");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/get-lawyer-details/${userId}`);
        setFullName(response.data.fullName); // Assuming the full name is in the response
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);
  const handleDashboardClick = () => {
    console.log("Dashboard clicked");
  };

  const handleChatbotClick = () => {
    console.log("Chatbot clicked");
    navigate('/lawyer/chatbot', { state: { fullName: fullName} });
  };

  const handleSearchClick = () => {
    console.log("Search clicked");
    navigate('/lawyer/searchclients', { state: { lawyerId: userId} });
  };

  const handleLegalClick = () => {
    console.log("Legal clicked");
    navigate('/lawyer/searchdocuments');
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen w-64 bg-gradient-to-br from-black via-zinc-900 to-neutral-800 border-r border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-in-out md:translate-x-0",
        isMenuOpen ? "translate-x-0" : "-translate-x-full",
        "md:block rounded-l-3xl"
      )}
    >
      <div className="p-4 flex items-center gap-2 border-b border-white/10">
        {/* Logo */}
        <svg
          className="h-8 w-8 text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4Z"
            fill="currentColor"
          />
          <path
            d="M22.5 18C22.5 17.175 21.825 16.5 21 16.5H17V12C17 11.175 16.325 10.5 15.5 10.5C14.675 10.5 14 11.175 14 12V16.5H9C8.175 16.5 7.5 17.175 7.5 18C7.5 18.825 8.175 19.5 9 19.5H14V24C14 24.825 14.675 25.5 15.5 25.5C16.325 25.5 17 24.825 17 24V19.5H21C21.825 19.5 22.5 18.825 22.5 18Z"
            fill="white"
          />
        </svg>
        <h2 className="text-2xl font-bold text-white drop-shadow">LegalEase</h2>
      </div>

      {/* Display fullName */}
      <div className="p-4 text-white">
        <div className="text-lg font-semibold">{fullName || 'User'}</div>
      </div>

      <nav className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start rounded-md transition-all duration-300 ease-in-out bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transform"
          onClick={handleDashboardClick}
        >
          <LayoutDashboard className="mr-2 h-5 w-5" />
          <span>Dashboard</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start rounded-md transition-all duration-300 ease-in-out text-zinc-300 hover:bg-white/10 hover:text-white hover:scale-105 transform"
          onClick={handleChatbotClick}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          <span>Chatbot</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start rounded-md transition-all duration-300 ease-in-out text-zinc-300 hover:bg-white/10 hover:text-white hover:scale-105 transform"
          onClick={handleSearchClick}
        >
          <Users className="mr-2 h-5 w-5" />
          <span>My Clients</span>
        </Button>

        {/*<Button
          variant="ghost"
          className="w-full justify-start rounded-md transition-all duration-300 ease-in-out text-zinc-300 hover:bg-white/10 hover:text-white hover:scale-105 transform"
          onClick={handleLegalClick}
        >
          <FileText className="mr-2 h-5 w-5" />
          <span>Case Files</span>
        </Button>*/}

      </nav>

      <div className="absolute top-4 right-[-36px] md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(false)}
        >
          <XCircle className="h-6 w-6 text-white hover:text-red-500 transition-colors" />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
