import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NewsDashboard from "../components/AdminDashboard/NewsDashboard";
import NavBar from "../components/NavBar";
import UsersDashboard from "../components/AdminDashboard/UsersDashboard";
import ForumDashboard from "../components/AdminDashboard/ForumDashboard";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const dataUser = !window.localStorage.userLogged ? "" : JSON.parse(window.localStorage.userLogged);
  const [dash, setDash] = useState('');
  let component = null;

  useEffect(() => {
    if (!dataUser || dataUser === "") {
      navigate("/")
    }
  }, [dataUser, navigate])

  if(dash === 'UsersDashboard') {
    component = <UsersDashboard />
  } else if (dash === 'NewsDashboard') {
    component = <NewsDashboard />
  } else if (dash === 'ForumDashboard') {
    component = <ForumDashboard />
  }



  return(
    <div>
      <NavBar />
      <div className="container flex flex-row my-5">
        <button 
          className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => setDash('UsersDashboard')}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Users
          </span>
        </button>
        <button 
          className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => setDash('NewsDashboard')}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            News
          </span>
        </button>
        <button 
          className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => setDash('ForumDashboard')}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Forum
          </span>
        </button>
      </div>
      {component}
    </div>
  )
}