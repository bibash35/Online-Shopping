
import axios from "axios";
import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Signup() {
  const navigate= useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [formError, setFormError] = useState({});

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { firstName, email, password, confirmPassword, role } = data;
    if (firstName && email && password && confirmPassword && role) {
      if (password === confirmPassword) {
        axios.post(`http://localhost:7000/api/auth/signup`, data)
          .then((res) => {
            toast.success("Signup successful");
            setIsLoading(false);
            navigate('/login');
          })
          .catch((err) => {
            toast.error("Signup failed");
            console.log(err);
            setIsLoading(false);
          });
      } else {
        toast.error("Password and Confirm Password do not match");
        setIsLoading(false);
      }
    } else {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-3 md:p-4">
        <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
          <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
            <img src={loginSignupImage} className="w-full h-full" />
          </div>
          <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              value={data.firstName}
              onChange={handleOnChange}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              value={data.lastName}
              onChange={handleOnChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              value={data.email}
              onChange={handleOnChange}
            />

            <label htmlFor="role">Role</label>
            <select
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
              name="role"
              value={data.role}
              onChange={handleOnChange}
            >
              <option value="">Select Role</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>

            <label htmlFor="password">Password</label>
            <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full bg-slate-200 border-none outline-none"
                value={data.password}
                onChange={handleOnChange}
              />
              <span className="flex text-xl cursor-pointer" onClick={handleShowPassword}>
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full bg-slate-200 border-none outline-none"
                value={data.confirmPassword}
                onChange={handleOnChange}
              />
              <span className="flex text-xl cursor-pointer" onClick={handleShowConfirmPassword}>
                {showConfirmPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
            >
              Signup
            </button>
          </form>
          <p className="text-left text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
