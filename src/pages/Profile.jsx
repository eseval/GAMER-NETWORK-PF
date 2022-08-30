import React , {useEffect} from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import FavoriteGames from "../components/FavoriteGames"
import NavBar from "../components/NavBar";


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
      <div>
        <NavBar />
        <div className='container mb-10'>
          <h1 className='m-5 text-5xl font-semibold text-center text-white'>Profile</h1>
          <div className="container max-w-2xl mt-10 overflow-hidden bg-gray-800 border border-gray-700 shadow sm:rounded-lg">
            <div className="flex flex-row items-center justify-end px-4 py-5 sm:px-6">
              <div className='flex flex-col items-end'>
                <h3 className="max-w-2xl mx-5 text-3xl font-semibold text-white">{dataUser.nickname}</h3>
                <Link to={`/profile/${dataUser.id}/edit`} state={dataUser} className='max-w-2xl mx-5 text-sm text-slate-400'>Edit info</Link>
              </div>
              <div className="w-24 h-24 overflow-hidden border-2 border-gray-400 rounded-full">
                <img src={dataUser.img} className='object-cover w-full h-full' alt={dataUser.nickname}/>
              </div>
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
                <div className="flex flex-row items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Favorite Games</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <FavoriteGames />
                  </dd>
                </div>
                <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Server</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {dataUser.servers && dataUser.servers.length > 0 ? dataUser.servers : 'No servers found'}
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
      </div>
    )
 
}
