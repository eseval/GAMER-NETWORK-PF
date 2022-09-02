import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import { green } from '@mui/material/colors';
import axios from 'axios';
import { getUsers } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function UsersActions({params, rowId, setRowId}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { id, nickname, description, plan, isAdmin, isSuperAdmin, coins, servers, deleteFlag, bannedFlag } = params.row;

    const result = await axios.put(`https://pf-henry-gamesportal.herokuapp.com/users/${id}`, {
      nickname,
      description,
      plan, 
      isAdmin, 
      isSuperAdmin, 
      coins, 
      servers, 
      deleteFlag, 
      bannedFlag
    });

    if(result){
      setSuccess(true);
      setRowId(null);
      dispatch(getUsers());
    }
    setLoading(false)
  }

  useEffect(() => {
    if(rowId === params.id && success) setSuccess(false)
  }, [rowId, params.id, success])


  return (
    <Box
    sx={{
      m:1,
      position: 'relative'
    }}
    >
      {success ? (
        <Fab
        color='primary'
        sx={{
          width:40,
          height:40,
          bgcolor: green[500],
          '&:hover': {bgcolor: green[700]}
        }}
        >
          <Check />
        </Fab>
      ) : (<Fab
        color='primary'
        sx={{
          width:40,
          height:40,
          bgcolor: green[500],
          '&:hover': {bgcolor: green[700]}
        }}
        disabled={params.id !== rowId || loading}
        onClick={handleSubmit}
        >
          <Save />
        </Fab>
        )}
        {loading && (
          <CircularProgress
          size={52}
          sx={{
            color:green[500],
            position:'absolute',
            top:-6,
            left:-6,
            zIndex: 1
          }}
          />
        )}
    </Box>
  )
}