import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Outlet } from 'react-router-dom';
import Header from "./component/Header";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setDataProduct } from './redux/slice/productSlice';
import { loginRedux } from './redux/slice/userSlice';
import { baseUrl } from './Url';
export default function App() {
  const [isLoading, setisLoading] = useState(true);

  const dispatch=useDispatch();

  useEffect(() => {
    // axios.get(`${baseUrl}/api/products`)
    axios.get(`https://online-shopping-backend-fg1s.onrender.com/api/products`)
    // axios.get(`http://localhost:7000/api/products`)
    .then((res) => {
      dispatch(setDataProduct(res.data))
      
    });
  }, [dispatch]);
  

// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     axios
//       .get("http://localhost:7000/api/auth/get-user", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         dispatch(loginRedux(res.data));
        
//       })
//       .catch((err) => {
//         console.error("Error fetching user data: ", err);
//         setisLoading(false);
//       });
//   } else {
//     setisLoading(false);
//   }
// }, [dispatch]);
  

useEffect(() => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    dispatch(loginRedux(JSON.parse(storedUser)));
    setisLoading(false);
  } else if (token) {
    // axios.get(`${baseUrl}/api/users/get-user`, {
    // axios.get(`http://localhost:7000/api/auth/get-user`, {
    axios.get(`https://online-shopping-backend-fg1s.onrender.com/api/auth/get-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(loginRedux(res.data));
      setisLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching user data: ", err);
      setisLoading(false);
    });
  } else {
    setisLoading(false);
  }
}, [dispatch]);


  return (
   <>
   <Header/>
   <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
    <Outlet/>
   
    <Toaster />
   </main>
   </>
  )
}
