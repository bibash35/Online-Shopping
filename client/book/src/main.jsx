import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider,createRoutesFromElements,Route,Link} from "react-router-dom";
import Home from './page/Home.jsx';
import Menu from './page/Menu.jsx';
import About from './page/About.jsx';
import Contact from './page/Contact.jsx';
import Newproduct from './page/Newproduct.jsx';
import Login from './page/Login.jsx';
import Signup from './page/Signup.jsx';
import store from "./redux/index.js"
import { Provider } from "react-redux";
import Cart from './page/Cart.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
<Route path='/' element={<App/>}>
<Route index element={<Home/>}/>
{/* <Route path='menu' element={<Menu/>}/> */}
<Route path="menu/:filterby" element={<Menu />} />
<Route path='about' element={<About/>}/>
<Route path='contact' element={<Contact/>}/>
<Route path='new-product' element={<Newproduct/>}/>
<Route path='login' element={<Login/>}/>
<Route path='signup' element={<Signup/>}/>
<Route path='cart' element={<Cart/>}/>
</Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
  <RouterProvider router={router} />
</Provider>
)
