import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByEmail, postUser } from '../redux/actions';
import LoginButton from '../components/Login';
import LogoutButton from '../components/Logout';
import Loader from '../components/Loader';


export default function LandingPage() {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const userDb = useSelector(state => state.user);

  useEffect(() => {
    if(userDb.length>0){}
    else{
      if(user) {
        dispatch(postUser(user));
        dispatch(getUserByEmail(user.email));
      }
    }
  }, [dispatch,user,userDb]);
  

  if(isAuthenticated) {
    while(window.localStorage.userLogged===""||window.localStorage.userLogged===undefined){
      return(
        <div className='container text-center'>
          <h1 className='text-5xl font-semibold text-white'>Play Center</h1>
          <div className='mt-10'>
            <Loader width={8} />
          </div>
        </div>
      )
    }
    return (
      <div className='container text-center'>
        <h1 className='text-5xl font-semibold text-white'>Play Center</h1>
        <div className='mt-10'>
            <h3 className='text-3xl font-semibold text-center text-white'>Welcome, {userDb.length > 0 ? userDb[0].nickname: ""}</h3>
            <div className='flex flex-row-reverse justify-center mt-10 align-middle'>
              <LogoutButton />
              <Link className="p-3 mx-5 text-center border rounded-md bg-slate-100" state={userDb[0]} to='/home'>Enter</Link>
            </div>
          </div>
      </div>
    )} else {
      window.localStorage.setItem("userLogged", "");
      return (
        <div className='container text-center'>
          <h1 className='text-5xl font-semibold text-white'>Play Center</h1>
          <LoginButton />
        </div>
      )
    }
}
