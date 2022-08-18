import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from '../components/Login';
import LogoutButton from '../components/Logout';
import '../styles/LandingPage.css'

export default function LandingPage() {

  return (
    <div>
      <h1 className='h1'>Play Center</h1>
      <div className='login'>
        <LoginButton/>
      </div>
      <br />
      <div className='logout'>
        <LogoutButton/>
      </div>
      <br />
      <Link to='/profile' className='profile'>Profile</Link>
    </div>
  )
}