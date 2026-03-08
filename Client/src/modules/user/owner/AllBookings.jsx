import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "../../../config/api";
import {useNavigate} from "react-router-dom"

const OwnerAllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const navigate = useNavigate();
 const getAllProperty = async () => {
    try {
      const response = await axios.get(
        "/api/owner/getallbookings",
        { withCredentials: true }
      );

      if (response.data.success) {
        setAllBookings(response.data.data);
      } else {
        message.error(response.data.message || "Unauthorized access");
        navigate("/login"); 
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        message.error("Session expired, please login again");
        navigate("/login");
      } else {
        message.error("Failed to fetch bookings");
      }
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);

  const handleStatus = async (bookingId, propertyId, status) => {
    try {
      const res = await axios.post(
        "/api/owner/handlebookingstatus",
        { bookingId, propertyId, status },
        { withCredentials: true }
      );

      if (res.data.success) {
        message.success(res.data.message);
        getAllProperty();
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to update booking status");
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
  <table className="min-w-full border border-slate-700 rounded-lg shadow-2xl bg-slate-900/70 backdrop-blur-md text-slate-200">
    <thead className="bg-cyan-600/80 text-white">
      <tr>
        <th className="py-3 px-4 text-left">Booking ID</th>
        <th className="py-3 px-4 text-center">Property ID</th>
        <th className="py-3 px-4 text-center">Tenant Name</th>
        <th className="py-3 px-4 text-center">Tenant Phone</th>
        <th className="py-3 px-4 text-center">Booking Status</th>
        <th className="py-3 px-4 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {allBookings.length > 0 ? (
        allBookings.map((booking, idx) => (
          <tr
            key={booking._id}
            className={`border-b border-slate-700 transition duration-200 hover:bg-slate-800/50 ${
              idx % 2 === 0 ? "bg-slate-800/40" : "bg-slate-900/40"
            }`}
          >
            <td className="py-3 px-4">{booking._id}</td>
            <td className="py-3 px-4 text-center">{booking.propertyId}</td>
            <td className="py-3 px-4 text-center">{booking.userName}</td>
            <td className="py-3 px-4 text-center">{booking.phone}</td>
            <td
              className={`py-3 px-4 text-center font-semibold ${
                booking.bookingStatus === "booked"
                  ? "text-emerald-400"
                  : "text-amber-300"
              }`}
            >
              {booking.bookingStatus}
            </td>
            <td className="py-3 px-4 text-center">
              {booking.bookingStatus === "pending" ? (
                <button
                  onClick={() =>
                    handleStatus(booking._id, booking.propertyId, "booked")
                  }
                  className="px-4 py-1 text-sm bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg transition shadow-md"
                >
                  Mark Booked
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleStatus(booking._id, booking.propertyId, "pending")
                  }
                  className="px-4 py-1 text-sm bg-amber-500/80 hover:bg-amber-400 text-white rounded-lg transition shadow-md"
                >
                  Mark Pending
                </button>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={6}
            className="py-6 px-4 text-center text-slate-400 italic"
          >
            No bookings available
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

  );
};

export default OwnerAllBookings;



