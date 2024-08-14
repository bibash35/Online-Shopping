import axios from "axios";
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!data.name) {
      errors.name = "Please fill out the name field";
      toast.error(errors.name);
    }

    if (!data.email) {
      errors.email = "Please fill out the email field";
      toast.error(errors.email);
    }

    if (!data.message) {
      errors.message = "Please fill out the message field";
      toast.error(errors.message);
    }

    if (Object.keys(errors).length === 0) {
      axios.post("http://localhost:7000/api/messages", data)
        .then((res) => {
          toast.success("Message sent successfully");
          setData({ name: "", email: "", message: "" }); // Clear form after submission
        })
        .catch((err) => {
          toast.error("An error occurred. Please try again.");
        });
    }
  };

  return (
    <div className="bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>
        <p className="text-lg text-center text-gray-600 mb-12">
          We would love to hear from you! Whether you have a question, concern, or feedback, feel free to reach out to us using the form below or via our contact information.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <FaPhoneAlt className="text-4xl text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-lg text-gray-600">+97 9841.....</p>
          </div>
          <div className="text-center">
            <FaEnvelope className="text-4xl text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-lg text-gray-600">speedynepal@ecommerce.com</p>
          </div>
          <div className="text-center">
            <FaMapMarkerAlt className="text-4xl text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
            <p className="text-lg text-gray-600">Budhanilkhanta-3,Kathmandu,Nepal</p>
          </div>
        </div>
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-lg text-gray-800 font-semibold mb-2" htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" // Ensure name attribute is correct
                value={data.name}
                onChange={handleOnChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder="Your Name" 
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-800 font-semibold mb-2" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" // Ensure name attribute is correct
                value={data.email}
                onChange={handleOnChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder="Your Email" 
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-800 font-semibold mb-2" htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" // Ensure name attribute is correct
                rows="5"
                value={data.message}
                onChange={handleOnChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder="Your Message" 
              ></textarea>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-500 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
