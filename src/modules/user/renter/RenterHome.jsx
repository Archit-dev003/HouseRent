import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import PropTypes from "prop-types";
import AllPropertiesCards from "../AllPropertiesCards";
import AllProperty from "./AllProperties";

const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} className="w-full mt-6">
      {value === index && <div>{children}</div>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const RenterHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  if (!user || !user.userData) return null;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Navbar */}
      <nav className="bg-slate-950/30 backdrop-blur-lg shadow-md px-6 py-4 flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-cyan-300 tracking-wide">HomeBuddy</h2>
        <div className="flex items-center gap-6">
          <h5 className="font-medium text-slate-200">
            Hi, {user.userData.name}
          </h5>
          <Link
            to="/"
            onClick={handleLogOut}
            className="px-4 py-2 text-sm bg-rose-600 text-white rounded-lg hover:bg-rose-500 transition"
          >
            Log Out
          </Link>
        </div>
      </nav>

      {/* Tabs */}
      <div className="w-full max-w-5xl mx-auto mt-10 bg-slate-900/80 border border-slate-700 shadow-xl rounded-xl p-6 backdrop-blur-md">
        <div className="flex border-b border-slate-700">
          <button
            className={`px-6 py-2 text-sm font-medium transition-colors ${value === 0
                ? "text-cyan-300 border-b-2 border-cyan-500"
                : "text-slate-400 hover:text-cyan-300"
              }`}
            onClick={() => setValue(0)}
          >
            All Properties
          </button>
          <button
            className={`px-6 py-2 text-sm font-medium transition-colors ${value === 1
                ? "text-cyan-300 border-b-2 border-cyan-500"
                : "text-slate-400 hover:text-cyan-300"
              }`}
            onClick={() => setValue(1)}
          >
            Booking History
          </button>
        </div>

        {/* Tab Panels */}
        <CustomTabPanel value={value} index={0}>
          <div className="mt-6">
            <AllPropertiesCards loggedIn={user.userLoggedIn} />
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <div className="mt-6">
            <AllProperty />
          </div>
        </CustomTabPanel>
      </div>
    </div>
  );
};

export default RenterHome;



