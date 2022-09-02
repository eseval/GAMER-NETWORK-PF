import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { getAllNews } from "../../redux/actions";
import { useMemo } from "react";
import { grey } from '@mui/material/colors';

export default function NewsDashboard() {
  const dispatch = useDispatch();
  const allNews = useSelector(state => state.allNews);

  const [rowId, setRowId] = useState(null)

  
  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch])  

  const columnNews = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 400 },
    { field: 'short_description', headerName: 'Description', width: 300 },
    { field: 'main_image', headerName: 'Image', width: 60, renderCell:params=><Avatar src={params.row.main_image} />, sortable:false, filterable:false },
  ], []);

  const rowNewsData = allNews?.map(news => {
    return {
      id: news?.id,
      title: news?.title,
      short_description: news?.short_description,
      main_image: news?.main_image
    }
  })

  return (
    <div>
      <h3 className="m-5 text-5xl font-semibold text-center text-white">News</h3>
      <Box
      sx={{
        height:600,
        width:'60%',
        margin:'auto',
        bgcolor: grey[100]
      }}
      >
        <DataGrid
          rows={rowNewsData} 
          columns={columnNews}  
          loading={!allNews.length}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) => 
                theme.palette.mode === 'light' ? grey[200] : grey[900],
            },
          }}
          pageSize={8}
          getRowId={row=>row.id}
          getRowSpacing={params=> ({
            top:params.isFirstVisible ? 0 : 3,
            bottom: params.isLastVisible ? 0 : 3,
          })}
          onCellEditStart={params=>setRowId(params.id)}
        />
      </Box>
    </div>
  )
}