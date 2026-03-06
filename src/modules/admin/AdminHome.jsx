import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import AllUsers from "./AllUsers";
import AllProperty from "./AllProperty";
import AllBookings from "./AllBookings";

const AdminHome = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

if (!user || !user.userData) return null;

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col text-slate-100">
  {/* Navbar */}
  <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/30 backdrop-blur-lg shadow-md py-4 px-8 flex justify-between items-center">
    <h2 className="text-3xl font-semibold text-cyan-300 tracking-wide">HomeBuddy</h2>
    <div className="flex items-center space-x-6">
      <span className="text-slate-200">Hi, {user.userData.name}</span>
      <button
        onClick={handleLogOut}
        className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-500 transition shadow-md"
      >
        Log Out
      </button>
    </div>
  </nav>

  {/* Admin Tabs */}
  <div className="max-w-6xl mx-auto w-full py-24 px-4"> 
    {/* Tabs */}
<div className="flex space-x-4 mb-6 border-b border-slate-700">
      <button
        onClick={() => setActiveTab("users")}
        className={`pb-2 px-4 text-lg font-medium transition ${
          activeTab === "users"
            ? "border-b-2 border-cyan-500 text-cyan-300"
            : "text-slate-400 hover:text-cyan-300"
        }`}
      >
        All Users
      </button>
      <button
        onClick={() => setActiveTab("properties")}
        className={`pb-2 px-4 text-lg font-medium transition ${
          activeTab === "properties"
            ? "border-b-2 border-cyan-500 text-cyan-300"
            : "text-slate-400 hover:text-cyan-300"
        }`}
      >
        All Properties
      </button>
      <button
        onClick={() => setActiveTab("bookings")}
        className={`pb-2 px-4 text-lg font-medium transition ${
          activeTab === "bookings"
            ? "border-b-2 border-cyan-500 text-cyan-300"
            : "text-slate-400 hover:text-cyan-300"
        }`}
      >
        All Bookings
      </button>
    </div>

    {/* Tab Panels */}
    <div className="bg-slate-900/70 backdrop-blur-lg border border-slate-700 rounded-xl p-6 shadow-2xl text-slate-200">
      {activeTab === "users" && <AllUsers />}
      {activeTab === "properties" && <AllProperty />}
      {activeTab === "bookings" && <AllBookings />}
    </div>
  </div>
</div>

  );
};

export default AdminHome;



