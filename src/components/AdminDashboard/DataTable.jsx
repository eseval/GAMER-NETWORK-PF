import React from 'react';
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({ rows, columns, loading, sx }) {



  return(
    <div className="container max-w-5xl mx-auto">
      <Box className="bg-white">
        <DataGrid
          rows={rows} 
          columns={columns}  
          loading={loading}
          sx={sx}
          checkboxSelection={true}
          pageSize={8}
        />
      </Box>
    </div>
  )
}