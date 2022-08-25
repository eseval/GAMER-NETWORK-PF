import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

export default function LogoutButton() {
  const { logout } = useAuth0();

  return(
    <button className="p-3 ml-5 text-center border rounded-md w-fit bg-slate-100" onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
  )
}