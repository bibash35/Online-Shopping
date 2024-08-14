import axios from "axios";

import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import ErrorMessage from "../component/ErrorMessage"
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-hot-toast";
import { baseUrl } from "../Url";

export default function Signup() {
  const navigate= useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
  });
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };
  const handleOnChange = (e) => {
setData({...data,[e.target.name]:e.target.value})
  }
  // const handleSubmit=(e)=>{
  //    e.preventDefault();
  //    setIsLoading(true);
  //    const {  password, confirmPassword } = data;

  //    // Check if password and confirmPassword match
  //    if (password !== confirmPassword) {
  //      toast.error("Passwords do not match");
  //      setIsLoading(false);
  //      return; // Exit early if passwords don't match
  //    }
  //    axios
  //     // .post("https://ecommerce-sagartmg2.vercel.app/api/users/signup",data,)
  //     .post("http://localhost:7000/api/auth/signup",data,)
  //     .then((res) => {
  //       toast.success("success");
  //       setIsLoading(false);
  //       navigate('/login')

  //     })
  //     .catch((err) => {
  //       console.log(err);

  //       if (err.response?.status === 400) {
  //         console.log(err.response.data.errors);
  //         toast.error("bad request");


  //         let errorsObj = {};

  //         err.response.data.errors.forEach((element) => {
  //           errorsObj[element.field] = element.msg
  //         });

  //         setFormError(errorsObj);
  //       } 
  //       else {
  //         toast.error("someting went wrong. try agin later.");
  //       }

  //       setIsLoading(false);
  //     });
  // }
  
      


 

  const handleSubmit=(e)=>{
     e.preventDefault();
     setIsLoading(true);
     const { firstName, email, password, confirmPassword } = data;
     if (firstName && email && password && confirmPassword) {
       if (password === confirmPassword) {
     
    //  axios.post("http://localhost:7000/api/auth/signup",data,)
     axios.post(`${baseUrl}/api/auth/signup`,data,)
      .then((res) => {
        toast.success("success");
        setIsLoading(false);
        navigate('/login')

      })
      .catch((err) => {
        console.log(err);

      });
    } else {
      toast("password and confirm password not equal");
    }
  } else {
    toast("Please Enter required fields");
  }
  }
  
      


 

  return (
    <>
       <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img src={ loginSignupImage} className="w-full h-full" />

        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.firstName}
            onChange={handleOnChange}
          />
          <ErrorMessage msg={formError.firstName} />

          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleOnChange}
          />
 <ErrorMessage msg={formError.lastName} />
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />
           <ErrorMessage msg={formError.email} />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <ErrorMessage msg={formError.password} />

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <ErrorMessage msg={formError.confirmPassword} />


          <button  type="submit" className="w-full max-w-[150px] m-auto 
           bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl 
           font-medium text-center py-1 rounded-full mt-4">
          Signup
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Already have account ?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
      {/* <ToastContainer theme="colored" /> */}
    </>
  );
}
