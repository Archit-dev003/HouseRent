import React, { useState, useEffect } from "react";
import axios from "../../../config/api";
import { message } from "antd";
import {useNavigate} from "react-router-dom"

function AddProperty() {
  const [image, setImage] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({
    propertyType: "residential",
    propertyAdType: "rent",
    propertyAddress: "",
    ownerContact: "",
    propertyAmt: 0,
    additionalInfo: "",
  });
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setPropertyDetails((prev) => ({
      ...prev,
      propertyImages: image,
    }));
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("propertyType", propertyDetails.propertyType);
    formData.append("propertyAdType", propertyDetails.propertyAdType);
    formData.append("propertyAddress", propertyDetails.propertyAddress);
    formData.append("ownerContact", propertyDetails.ownerContact);
    formData.append("propertyAmt", propertyDetails.propertyAmt);
    formData.append("additionalInfo", propertyDetails.additionalInfo);

    if (image) {
      for (let i = 0; i < image.length; i++) {
        formData.append("propertyImages", image[i]);
      }
    }

    try {
      const res = await axios.post(
        "/api/owner/postproperty",
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        message.success(res.data.message);
        setPropertyDetails({
          propertyType: "residential",
          propertyAdType: "rent",
          propertyAddress: "",
          ownerContact: "",
          propertyAmt: 0,
          additionalInfo: "",
        });
        setImage(null);
      } else {
        message.error(res.data.message || "Unauthorized access");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      if (error.response && error.response.status === 401) {
        message.error("Session expired, please login again");
        navigate("/login");
      } else {
        message.error("Failed to add property");
      }
    }
  };;

  return (
 <div className="max-w-5xl mx-auto bg-slate-900/70 border border-slate-700 backdrop-blur-md shadow-2xl rounded-xl p-8 mt-12 text-white">
  <h2 className="text-3xl font-extrabold text-cyan-300 mb-8 text-center tracking-wide">
    Add New Property
  </h2>

  <form onSubmit={handleSubmit} className="space-y-8">
    {/* Row 1 */}
    <div className="grid md:grid-cols-3 gap-6">
      <div>
        <label className="block font-medium mb-2 text-slate-300">
          Property Type
        </label>
        <select
          name="propertyType"
          value={propertyDetails.propertyType}
          onChange={handleChange}
          className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400"
        >
          <option disabled>Choose...</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="land/plot">Land/Plot</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-2 text-slate-300">
          Property Ad Type
        </label>
        <select
          name="propertyAdType"
          value={propertyDetails.propertyAdType}
          onChange={handleChange}
          className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400"
        >
          <option disabled>Choose...</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-2 text-slate-300">
          Property Full Address
        </label>
        <input
          type="text"
          name="propertyAddress"
          value={propertyDetails.propertyAddress}
          onChange={handleChange}
          placeholder="Address"
          required
          className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400"
        />
      </div>
    </div>

    {/* Row 2 */}
    <div className="grid md:grid-cols-3 gap-6">
      <div>
        <label className="block font-medium mb-2 text-slate-300">
          Property Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          required
          onChange={handleImageChange}
          className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 cursor-pointer text-white file:mr-3 file:px-3 file:py-1 file:rounded-md file:border-0 file:bg-cyan-600 file:text-white hover:file:bg-cyan-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-2 text-slate-300">
          Owner Contact No.
        </label>
        <input
          type="tel"
          name="ownerContact"
          value={propertyDetails.ownerContact}
          onChange={handleChange}
          placeholder="Contact number"
          required
          className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400"
        />
      </div>

      <div>
        <label className="block font-medium mb-2 text-slate-300">
          Property Amount
        </label>
        <input
          type="number"
          name="propertyAmt"
          value={propertyDetails.propertyAmt}
          onChange={handleChange}
          placeholder="Amount"
          required
          className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400"
        />
      </div>
    </div>

    {/* Row 3 */}
    <div>
      <label className="block font-medium mb-2 text-gray-300">
        Additional Details for the Property
      </label>
      <textarea
        name="additionalInfo"
        value={propertyDetails.additionalInfo}
        onChange={handleChange}
        rows={4}
        placeholder="Add any details here..."
        className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400"
      />
    </div>

    {/* Submit */}
    <div className="text-right">
      <button
        type="submit"
        className="bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-cyan-500 transition duration-200"
      >
        Submit Form
      </button>
    </div>
  </form>
</div>
  );
}

export default AddProperty;



