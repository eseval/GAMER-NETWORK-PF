import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "./DataTable";
import { getAllPosts } from "../../redux/actions";

export default function ForumDashboard() {
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.posts);
  
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch])

  const postsTableStyles = {
    height: '550px'
  }

  const columnsPosts = [
    { field: 'id', headerName: 'Post ID', width: 150 },
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'text', headerName: 'Content', width: 150 },
    { field: 'othersUsersLike', headerName: 'Likes', width: 150 },
    { field: 'deleteFlag', headerName: 'Delete Flag', width: 150 },
    { field: 'report', headerName: 'Reports', width: 150 },
    { field: 'genre', headerName: 'Genre', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
    { field: 'updatedAt', headerName: 'Updated At', width: 150 },
    { field: 'answers', headerName: 'Answers', width: 150 },
  ]

  console.log(allPosts)
  return (
    <div>
      <h3 className="m-5 text-5xl font-semibold text-center text-white">Forum</h3>
      <DataTable 
        rows={allPosts} 
        columns={columnsPosts} 
        loading={!allPosts.length} 
        sx={postsTableStyles}
      />
    </div>
  )
}