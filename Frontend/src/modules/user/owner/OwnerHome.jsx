import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import AddProperty from "./AddProperty";
import AllProperties from "./AllProperties";
import AllBookings from "./AllBookings";

const tabs = [
  { name: "Add Property", component: <AddProperty /> },
  { name: "All Properties", component: <AllProperties /> },
  { name: "All Bookings", component: <AllBookings /> },
];

const OwnerHome = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  if (!user || !user.userData) return null;

  const handleLogOut = () => {
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/30 backdrop-blur-lg shadow-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-cyan-300 tracking-wide">HomeBuddy</h2>
          <div className="flex items-center gap-6">
            <h5 className="font-medium text-slate-200">
              Hi {user.userData.name}
            </h5>
            <button
              onClick={handleLogOut}
              className="px-4 py-2 text-sm bg-rose-600/80 text-white rounded-lg shadow hover:bg-rose-500 transition duration-200"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex space-x-4 border-b border-gray-700">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 font-medium text-sm transition-all duration-200 rounded-t-lg
            ${activeTab === index
                  ? "text-cyan-300 border-b-2 border-cyan-500 bg-cyan-500/10 shadow-inner"
                  : "text-slate-400 hover:text-cyan-300 hover:bg-slate-800/40"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-slate-900/70 border border-slate-700 backdrop-blur-md mt-6 p-6 shadow-2xl rounded-xl transition-all">
          {tabs[activeTab].component}
        </div>
      </div>
    </div>

  );
};

export default OwnerHome;



