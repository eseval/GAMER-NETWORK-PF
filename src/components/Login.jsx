import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return(
    <button className="p-3 mt-10 text-center border rounded-md w-fit bg-slate-100" onClick={() => loginWithRedirect()}>Login</button>
  )
}