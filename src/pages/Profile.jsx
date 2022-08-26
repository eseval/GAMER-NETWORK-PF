import React , {useEffect} from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import FavoriteGames from "../components/FavoriteGames"


export default function Profile() {
  const navigate= useNavigate()
  const dataUser = !window.localStorage.userLogged ? "" : JSON.parse(window.localStorage.userLogged);

  useEffect(()=>{
    if(!dataUser || dataUser===""){
      navigate("/")
    }
  },[dataUser, navigate])
  
  const userPlan = () => {
    if(dataUser.plan) {
      return 'Premium'
    } else {
      return 'Free'
    }
  }
  
    return (
      <div className='container'>
        <div className="px-6 py-4">
          <Link className="text-lg text-white" to='/home'>Return to Home</Link> 
        </div> 
        <h1 className='m-5 text-5xl font-semibold text-center text-white'>Profile</h1>
        <div className="container max-w-lg mt-10 overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="flex flex-row items-center justify-end px-4 py-5 sm:px-6">
            <div className='flex flex-col items-end'>
  
              <h3 className="max-w-2xl mx-5 text-3xl">{dataUser.nickname}</h3>
  
              <Link to={`/profile/${dataUser.id}/edit`} state={dataUser} className='max-w-2xl mx-5 text-sm text-gray-500'>Edit info</Link>
            </div>
            <img src={dataUser.img !== null ? dataUser.img : 'https://proyectoidis.org/wp-content/uploads/2021/06/avatar-default.png'} className='inline-block w-20 h-20 rounded-full ring-2 ring-black' alt={dataUser.nickname}/>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dataUser.email}</dd>
              </div>
              <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Plan</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userPlan()}</dd>
              </div>
              <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Favorite Games</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
  
                  {/* {user.favoriteGames ? user.favoriteGames.join(', ') : 'No games found'} */}
                  <FavoriteGames/>
  
                </dd>
              </div>
              <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Server</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
  
                  {dataUser.servers && dataUser.servers.length > 0 ? dataUser.servers : 'No servers found'}
  
                  {/* {dataUser.servers  ? dataUser.servers.join(', ') : 'No servers found'} */}
  
                </dd>
              </div>
              <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Matched users</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
  
  
                  {dataUser.matched_users && dataUser.matched_users.length>0 ? dataUser.matched_users.join(', ') : 'No users found'}
  
                </dd>
              </div>
              <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Missions Completed</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
  
  
                  {dataUser.missionCompleted ? dataUser.missionCompleted.length : ""}
  
                </dd>
              </div>
              <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Coins</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dataUser.coins}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    )
 
}
