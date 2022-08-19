import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from '../components/Login';
import LogoutButton from '../components/Logout';
import '../styles/LandingPage.css'

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth0();

  if(isAuthenticated) {
    return (
      <div>
        <h1 className='h1'>Play Center</h1>
        <div>
          <div className='text-3xl text-center'>
            <h3>Welcome, {user.nickname}</h3>
          </div>
            <div className='login'>
              <LogoutButton />
            </div>
            <br />
            <Link to='/home' className='login'>Enter</Link>
          </div>
      </div>
    )} else {
      <div>
        <h1 className='h1'>Play Center</h1>
        <div className='login'>
          <LoginButton />
        </div>
      </div>
    }
}