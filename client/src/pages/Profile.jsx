import React, { useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../redux/actions'

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const usersFromBack = useSelector(state => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  console.log(usersFromBack[0]);

  if (isLoading) {
    return <div>Loading...</div>
  }
  
  console.log(user)
  return (
    isAuthenticated && (
      <div>
        {user.name}
      </div>
    )
  )
}