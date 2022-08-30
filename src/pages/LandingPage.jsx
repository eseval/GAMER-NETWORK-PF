import React, { useEffect  } from 'react';
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
        <div>

        <div className="bg-[url('https://cdnb.artstation.com/p/assets/images/images/012/193/905/original/maria-hager-titlescreen-retro-glitch.gif?1533552570')] bg-cover bg-center bg-no-repeat bg-center fixed h-screen w-screen">
        </div>
        <div className='container text-center align-middle'>
          <h1 className='text-5xl font-semibold text-white '>Play Center</h1>
          <div className='mt-10'>
            <Loader width={8} />
          </div>
        </div>
        </div>

        
      )
    }
    return (
      <div className="bg-[url('https://cdnb.artstation.com/p/assets/images/images/012/193/905/original/maria-hager-titlescreen-retro-glitch.gif?1533552570')] bg-cover bg-center bg-no-repeat bg-center fixed h-screen w-screen">
        <div className='container text-center align-middle'>
          <h1 className='text-5xl font-semibold text-white'>Play Center</h1>
          <div className='mt-10'>
              <h3 className='text-3xl font-semibold text-center text-white'>Welcome, {userDb.length > 0 ? userDb[0].nickname: ""}</h3>
              <div className='flex flex-row-reverse justify-center mt-10 align-middle'>
                <LogoutButton />
                <Link state={userDb[0]} to='/home'>
                  <button class="relative inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Enter
                    </span>
                  </button>
                </Link>
              
              </div>
            </div>
        </div>
      </div>
    )} else {
      window.localStorage.setItem("userLogged", "");
      return (
        <div className="bg-[url('https://cdnb.artstation.com/p/assets/images/images/012/193/905/original/maria-hager-titlescreen-retro-glitch.gif?1533552570')] bg-cover bg-center bg-no-repeat bg-center fixed h-screen w-screen">
        <div className='container px-8 text-center align-middle'>
          <h1 className='text-6xl font-semibold text-white'>Play Center</h1>
          <div className='mt-10'>
          <LoginButton />
          </div>
        </div>
        </div>
      )
    }
}
