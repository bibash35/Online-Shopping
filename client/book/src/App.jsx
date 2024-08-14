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
  // const productData = useSelector((state)=>state.product)

  useEffect(() => {
    // axios.get("http://localhost:7000/api/products")
    axios.get(`${baseUrl}/api/products`)
    .then((res) => {
      // setProducts(res.data);
      dispatch(setDataProduct(res.data))
      
    });
  }, [dispatch]);
  
  useEffect(() => {
    let storedUser = localStorage.getItem("user");

    if (storedUser) {
      // axios.get("http://localhost:7000/api/auth/getAllUsers")
      axios.get(`${baseUrl}/api/auth/getAllUsers`)
        .then((res) => {
  dispatch(loginRedux(JSON.parse(storedUser)));
          setisLoading(false);
        })
        .catch((err) => {
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
    {/* {JSON.stringify(products)} */}
    {/* {JSON.stringify(productData)} */}
    <Toaster />
   </main>
   </>
  )
}
