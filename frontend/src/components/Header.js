import React, { useContext } from 'react'
import Log from './Log'
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import RegisterApi from "../utils/Constant";
import axios from 'axios';
import { setUserDetails } from '../store/userSlice';
import ROLE from "../utils/Role"
import Context from "../context"

const Header = () => { 
  const user = useSelector((state) => state?.user?.user);
  // console.log("user",user)
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
   const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const [search, setSearch] = useState();
  
  

  
  const handleLogout = async() => {
    try {
      const res = await axios.post(RegisterApi.logout.url, {
        method: RegisterApi.logout.method,
        withCredentials: true,
      }
      );

      if (res.data.success) {
        toast.success(res.data.message);
          dispatch(setUserDetails(null))
      navigate("/")
      }
    } catch (error) {
      toast.success(error?.response?.data?.message);
      console.log(error);
    }
  }

  const handleSearch = (e) => {
     const { value } = e.target;
     setSearch(value)

     if (value) {
       navigate(`/search?q=${value}`);
     } else if (!value) {
       
       navigate("/")
     } else {
       navigate("/search");
     }
   
  }
    return (
      <header
        className="h-20 shadow-md bg-white fixed w-full  z-40  
      "
      >
        <div className=" h-full container mx-auto flex items-center px-4 justify-between">
          <div className="">
            <Link to={"/"}>
              <Log />
            </Link>
          </div>

          <div className="  hidden md:flex    items-center w-full justify-between max-w-sm  border rounded-full  focus-within:shadow-md">
            <input
              type="text"
              placeholder="search product here..... "
              className="w-full outline-none px-1 "
              onChange={(handleSearch)}
              value={search}
            />
            <div className="text-lg min-w-[50px]  h-8 bg-red-600  flex items-center  justify-center  rounded-r-full text-white">
              <FaSearch />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative  flex justify-center">
              {user?._id && (
                <div
                  className="text-3xl cursor-pointer"
                  onClick={() => setMenuDisplay(!menuDisplay)}
                >
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className="w-10 h-10 rounded-full"
                      alt={user?.name}
                    />
                  ) : (
                    <FaRegCircleUser />
                  )}
                </div>
              )}

              {menuDisplay && (
                <div className="absolute bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                  <nav>
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to={"/admin-panel/all-products"}
                        className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                        onClick={() => setMenuDisplay(!menuDisplay)}
                      >
                        Admin Panel
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </div>
            {user?._id && (
              <Link to={"/cart"} className="text-3xl relative">
                <span>
                  <AiOutlineShoppingCart />
                </span>

                <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-3 -right-2">
                  <p className="text-sm">{context?.cartProductCount}</p>
                </div>
              </Link>
            )}

            <div>
              {user?._id ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    );
}

export default Header