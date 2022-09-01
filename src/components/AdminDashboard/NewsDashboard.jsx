import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "./DataTable";
import { getAllNews } from "../../redux/actions";

export default function NewsDashboard() {
  const dispatch = useDispatch();
  const allNews = useSelector(state => state.allNews);
  
  useEffect(() => {
    dispatch(getAllNews());
  })

  const newsTableStyles = {
    height: '550px'
  }

  const columnsNews = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'short_description', headerName: 'Description', width: 150 },
    { field: 'main_image', headerName: 'Image', width: 150 },
  ]


  return (
    <div>
      <h3 className="m-5 text-5xl font-semibold text-center text-white">News</h3>
      <DataTable 
        rows={allNews} 
        columns={columnsNews} 
        loading={!allNews.length} 
        sx={newsTableStyles}
      />
    </div>
  )
}