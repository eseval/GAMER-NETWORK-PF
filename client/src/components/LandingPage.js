import React from 'react';
import LoginButton from './Login';
import LogoutButton from './Logout';
import Profile from './Profile';

export default function LandingPage() {

    return (
        <div className='charg'>
            <h1>Play Center</h1>
            <h3>Welcome to (what will be) the best game site EVER! </h3>
            <LoginButton />
            <LogoutButton />
            <Profile />
        </div>
    )
}