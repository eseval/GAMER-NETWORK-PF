import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NewsDashboard from "../components/AdminDashboard/NewsDashboard";
import NavBar from "../components/NavBar";
import UsersDashboard from "../components/AdminDashboard/UsersDashboard";

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
  }



  return(
    <div>
      <NavBar />
      <div>
        <button onClick={() => setDash('UsersDashboard')}>Users</button>
        <button onClick={() => setDash('NewsDashboard')}>News</button>
      </div>
      {component}
    </div>
  )
}