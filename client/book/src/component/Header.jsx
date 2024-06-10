import React, { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/userSlice";
import { toast } from "react-hot-toast";

export default function Header() {
  let user = useSelector((store) => store.user.value);

  const dispatch = useDispatch()


  const [showUser, setShowUser] = useState(false);
  const handleShowMenu = () => {
    setShowUser(!showUser);
    // setShowUser((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logout());
    toast("Logout successfully");
  };
  const cartItemNumber = useSelector((state)=>state.product.cartItem)

  return (
    <>
      <header className="fixed shadow-md w-full h-14 px-3 z-50 bg-white">
        <div className="logo flex items-center h-full justify-between">
          <Link to={""}>
            <div className="h-10 flex items-center justify-start flex-grow ">
              {/* <FaShoppingBasket className="text-5xl h-full" /> */}
              <span className=" text-base  md:text-2xl md:h-full text-red-600 font-bold">SpeedyHome</span>
              {/* <img src={logo} className="h-full" /> */}
            </div>
          </Link>
          <div className="flex items-center gap-4 md:gap-7">
            <nav className=" gap-1 md:gap-6 text-base md:text-lg hidden md:flex">
              <Link to={""}>Home</Link>
              <Link to={"menu"}>Menu</Link>
              {/* <Link to={"menu/6646db74d493e350c9c7cda1"}>Menu</Link> */}
              <Link to={"about"}>About</Link>
              <Link to={"contact"}>Contact</Link>
            </nav>
            <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <FaShoppingCart />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                {cartItemNumber.length}
              </div>
              </Link>
            </div>
            <div className="flex  items-center justify-center "> {/* Container for aligning username */}
              <div className="text-2xl text-slate-600" onClick={handleShowMenu}>
                <div className="cursor-pointer  drop-shadow-md">
                  <FaRegUserCircle />
                </div>
                {showUser && (
                  <div className="  absolute right-2 flex flex-col text-sm bg-white py-2  
                  shadow drop-shadow-md ">
                       {user?.email&& (
                  <Link
                    to={"new-product"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New product
                  </Link>
                )}
                      {
                        user ? <p className="cursor-pointer text-white bg-red-500
           px-2" onClick={handleLogout}>Logout ({user.firstName}){" "}</p>
        : <Link to={"login"} className="whitespace-nowrap cursor-pointer px-2">Login</Link>
                      }
                   <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"menu/63f0fdbb3bcc2f97fa53d25d"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link to={"about"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
                  </div>
                )}
              </div>
              <span className="text-red-500 font-bold">{user?.firstName}</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

