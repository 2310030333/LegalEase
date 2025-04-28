import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Calendar, Home } from "lucide-react";
import backgroundImage from "../assets/clientdashbord.jpg";

const ClientDashboard = () => {
  const user = localStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;
  const displayName = userObj?.fullName || userObj?.username || "User";

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/clientdashboard";

  return (
    <div
      className={`min-h-screen text-white flex flex-col ${
        isHome
          ? "bg-cover bg-center bg-no-repeat"
          : "bg-gray-950"
      }`}
      style={{
        ...(isHome && {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }),
      }}
    >
      {/* Overlay */}
      <div
        className={`min-h-screen ${
          isHome ? "bg-gray-950 bg-opacity-80" : ""
        } flex flex-col`}
      >
        {/* Top Icons */}
        <div className="flex justify-between items-center p-6 relative">
          {/* House icon in top-left corner */}
          {!isHome && (
            <button
              onClick={() => navigate("/clientdashboard")}
              className="p-0"
            >
              <Home className="w-6 h-6 cursor-pointer text-white hover:text-gray-300" />
            </button>
          )}
          {/* Calendar and Bell icons on the top-right */}
          <div className="absolute top-6 right-6 flex items-center gap-4">
            <Calendar className="w-6 h-6 cursor-pointer" />
            <Bell className="w-6 h-6 cursor-pointer" />
          </div>
        </div>

        {/* Only show welcome & section links on main dashboard page */}
        {isHome && (
          <>
            <div className="flex flex-col items-center mt-10">
              <span className="text-4xl font-bold tracking-wide text-gray-200">
                Welcome {displayName}
              </span>
            </div>

            <div className="flex justify-center items-center mt-16 gap-12">
              <Link
                to="/searchlawyer"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-lg font-medium transition-transform transform hover:scale-110 hover:shadow-2xl"
              >
                Search for Lawyer
              </Link>
              <Link
                to="/appointments"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-lg font-medium transition-transform transform hover:scale-110 hover:shadow-2xl"
              >
                Appointments
              </Link>
              <Link
                to="/allcases"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-lg font-medium transition-transform transform hover:scale-110 hover:shadow-2xl"
              >
                All Cases
              </Link>
            </div>
          </>
        )}

        {/* Removed Outlet since subsections are now independent pages */}
      </div>
    </div>
  );
};

export default ClientDashboard;
