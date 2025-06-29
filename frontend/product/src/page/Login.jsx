import axios from "axios";
import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import ErrorMessage from "../component/ErrorMessage"
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import {toast} from "react-hot-toast"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRedux } from "../redux/slice/userSlice"
import { useDispatch } from "react-redux";
export default function Login() {
  const navigate= useNavigate()

  const dispatch = useDispatch()
  
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
     
    email: "",
    password: "" 
  })
  console.log(data );
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  

  const [formError, setFormError] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Update data state
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Remove error for the field being changed
    setFormError((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (updatedErrors[name]) {
        delete updatedErrors[name]; // Remove the error for the field
      }
      return updatedErrors;
    });
  };

  const handleSubmit=(e)=>{
     e.preventDefault();
     let errors = {};
     const { email, password } = data;
   
     if (!email) {
       errors.email = "Email is required";  
     }
   
     if (!password) {
       errors.password = "Password is required";  
     }
   
     // If there are validation errors, set them and return
     if (Object.keys(errors).length > 0) {
       setFormError(errors);
       return;
     }

    axios.post(`http://localhost:7000/api/auth/login`,data,)
     .then((res) => {
      //  toast.success("success");
       dispatch(loginRedux(res.data))
       localStorage.setItem("user", JSON.stringify(res.data));
      //  localStorage.setItem("token", res.data.access_token);
      localStorage.setItem('token', res.data.token);


       toast.success("logged in successfully" )
       navigate('/')

     })
     .catch((err) => {
       console.log(err);

       if (err.response?.status === 400) {
         console.log(err.response.data.errors);
         toast.error("bad request");


         let errorsObj = {};

         err.response.data.errors.forEach((element) => {
           errorsObj[element.field] = element.msg
         });

         setFormError(errorsObj);
       } 
       else {
         toast.error("someting went wrong. try agin later.");
       }

     });

  }

  return (
    <>
       <div className="p-3 md:p-4">
    <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
      <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
        <img src={loginSignupImage} className="w-full" />
      </div>

      <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type={"email"}
          id="email"
          name="email"
          className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          value={data.email}
          onChange={handleOnChange}

        />
            {formError.email && <ErrorMessage msg={formError.email} />}

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

        {formError.password && <ErrorMessage msg={formError.password} />}


        <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
          Login
        </button>
      </form>
      <p className="text-left text-sm mt-2">
        Don't  have account ?{" "}
        <Link to={"/signup"} className="text-red-500 underline">
          Sign Up
        </Link>
      </p>
    </div>
  </div>
      <ToastContainer theme="colored" />
    </>
  );
}
