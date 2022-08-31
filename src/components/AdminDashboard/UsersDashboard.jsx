import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "./DataTable";
import { getUsers } from "../../redux/actions";

export default function UsersDashboard() {
  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.users);
  
  useEffect(() => {
    dispatch(getUsers());
  })

  const usersTableStyles = {
    height: '550px'
  }

  const columnsUsers = [
    { field: 'id', headerName: 'User ID', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'nickname', headerName: 'Nickname', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'plan', headerName: 'Plan', width: 150 },
    { field: 'isAdmin', headerName: 'Admin', width: 150 },
    { field: 'img', headerName: 'Avatar', width: 150 },
    { field: 'favoriteGames', headerName: 'Favorite Games', width: 150 },
    { field: 'wantsMatch', headerName: 'Wants Match', width: 150 },
    { field: 'matched_users', headerName: 'Matched Users', width: 150 },
    { field: 'coins', headerName: 'Coins', width: 150 },
    { field: 'rating', headerName: 'Rating', width: 150 },
    { field: 'forums', headerName: 'Posts', width: 150 },
    { field: 'answers', headerName: 'Answers', width: 150 },
    { field: 'missions', headerName: 'Missions', width: 150 },
    { field: 'deleteFlag', headerName: 'Delete Flag', width: 150 },
    { field: 'bannedFlag', headerName: 'Banned Flag', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
    { field: 'updatedAt', headerName: 'Updated At', width: 150 },
  ];


  return (
    <div>
      <h3 className="m-5 text-5xl font-semibold text-center text-white">Users</h3>
      <DataTable 
        rows={allUsers} 
        columns={columnsUsers} 
        loading={!allUsers.length} 
        sx={usersTableStyles}
      />
    </div>
  )
}