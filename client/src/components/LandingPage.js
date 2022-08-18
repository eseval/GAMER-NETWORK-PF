import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './Login';
import LogoutButton from './Logout';

export default function LandingPage() {

  return (
    <div>
      <h1>Play Center</h1>
      <h3>Welcome to (what will be) the best game site EVER! </h3>
      <LoginButton />
      <LogoutButton />
      <Link to='/profile'>Profile</Link>
    </div>
  )
}