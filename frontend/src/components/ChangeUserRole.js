import React from 'react'
import { IoMdClose } from "react-icons/io"
import ROLE from '../utils/Role';
import { useState } from "react";
import RegisterApi from '../utils/Constant';
import toast from 'react-hot-toast';
import axios from 'axios';

const ChangeUserRole = ({
  onClose = {},
  name,
  email,
  role,
  userId,
  callFunc,
}) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };
  const updateUserRole = async () => {
    try {
      const update = await axios.post(
        RegisterApi.updateUser.url,
        {
          userId: userId,
          role: userRole,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (update.data.success) {
        toast.success(update.data.message);
        onClose();
        callFunc();
      } else {
        toast.error(update.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50 ">
      <div className=" mx-auto shadow-md p-4 w-full max-w-sm bg-white">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>

        <p>Name :{name} </p>
        <p>Email :{email} </p>
        <div className="flex items-center justify-between my-4">
          <p>Role :{role}</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole