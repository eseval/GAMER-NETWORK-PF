import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUserById } from "../redux/actions";

export default function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(state => state.user);
  const isLoading = useSelector(state => state.isLoadingUser);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  const userPlan = () => {
    if(user.plan) {
      return 'Premium'
    } else {
      return 'Free'
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  console.log(user)
  return (
    <div className='container'>
      <div className="px-6 py-4">
        <Link className="text-lg text-white" to='/home'>Return to Home</Link> 
      </div> 
      <h1 className='m-5 text-5xl font-semibold text-center text-white'>Profile</h1>
      <div className="container max-w-lg mt-10 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="flex flex-row items-center justify-end px-4 py-5 sm:px-6">
          <div className='flex flex-col items-end'>
            <h3 className="max-w-2xl mx-5 text-3xl">{user.nickname}</h3>
            <Link to={`/profile/${id}/edit`} state={user} className='max-w-2xl mx-5 text-sm text-gray-500'>Edit info</Link>
          </div>
          <img src={user.img !== null ? user.img : 'https://proyectoidis.org/wp-content/uploads/2021/06/avatar-default.png'} className='inline-block w-20 h-20 rounded-full ring-2 ring-black' alt={user.nickname}/>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Plan</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userPlan()}</dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Favorite Games</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">

                {/* {user.favoriteGames ? user.favoriteGames.join(', ') : 'No games found'} */}
                {user.favoriteGames && user.favoriteGames.length>0 ? user.favoriteGames : 'No games found'}

              </dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Server</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">

                {user.servers && user.servers.length > 0 ? user.servers : 'No servers found'}

                {/* {user.servers  ? user.servers.join(', ') : 'No servers found'} */}

              </dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Matched Users</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">


                {user.matched_users && user.matched_users.length>0 ? user.matched_users.join(', ') : 'No users found'}

              </dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Missions Completed</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">


                {user.missionCompleted ? user.missionCompleted.length : ""}

              </dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Coins</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.coins}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
