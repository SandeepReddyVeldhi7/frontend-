import React from 'react'
import  { useEffect, useState } from "react";
import RegisterApi from '../utils/Constant.js'
import { MdModeEdit } from "react-icons/md";
import toast from 'react-hot-toast';
import moment from "moment";
import axios from 'axios';
import ChangeUserRole from '../components/ChangeUserRole.js';

const AllUser =  () => {
     const [allUser,setAllUsers] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : ""
    })
    const fetchAllUsers = async () => {
      try {
        const fetchData = await axios.get(
          RegisterApi.allUser.url,
          
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (fetchData.data.success) {
          setAllUsers(fetchData.data.data);
        } else {
          toast.error(fetchData.data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch users");
        console.error(error);
      }
    };

      

    useEffect(()=>{
        fetchAllUsers()
    },[])

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
          {allUser.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format("LL")}</td>
                <td>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
}

export default AllUser