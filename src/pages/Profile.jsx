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
      <div class="bg-white shadow overflow-hidden sm:rounded-lg container max-w-lg mt-10">
        <div class="flex flex-row px-4 py-5 sm:px-6 justify-end items-center">
          <div className='flex flex-col items-end'>
            <h3 class="max-w-2xl text-3xl mx-5">{user.nickname}</h3>
            <Link to={`/profile/${id}/edit`} state={user} className='max-w-2xl mx-5 text-sm text-gray-500'>Edit info</Link>
          </div>
          <img src={user.img !== null ? user.img : 'https://proyectoidis.org/wp-content/uploads/2021/06/avatar-default.png'} className='inline-block w-20 h-20 rounded-full ring-2 ring-black' alt={user.nickname}/>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Email</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Plan</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userPlan()}</dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Favorite Games</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">

                {/* {user.favoriteGames ? user.favoriteGames.join(', ') : 'No games found'} */}
                {user.favoriteGames && user.favoriteGames.length>0 ? user.favoriteGames : 'No games found'}

              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Server</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">

                {user.servers && user.servers.length > 0 ? user.servers : 'No servers found'}

                {/* {user.servers  ? user.servers.join(', ') : 'No servers found'} */}

              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Matched Users</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">


                {user.matched_users && user.matched_users.length>0 ? user.matched_users.join(', ') : 'No users found'}

              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Missions Completed</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">


                {user.missionCompleted ? user.missionCompleted.length : ""}

              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Coins</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.coins}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
