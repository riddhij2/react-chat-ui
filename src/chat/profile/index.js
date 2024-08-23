import { Avatar, Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Profile({ user }) {
  const navigate = useNavigate();
  const logout = ()=>{
    // sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/")
  }
  return (
    <Box 
       sx={{
        bgcolor: "#eee", 
        width: "20vw", 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
        }}>
      <Avatar src ="/static/images/avatar/2.jpg"
        sx={{ width: "156px", height: "156px" }}
      />
      <Typography 
        variant='h4'
        sx={{textTransform: "uppercase", color: "primary.light", mt: 3}}
        >
          {user.name}
        </Typography>
      <Typography variant="subtitle1">Frontend Developer</Typography>
      <Typography variant = "body2">{user.email}</Typography>
      <Button onClick={logout} variant='contained' sx={{bgcolor: "primary.light", mt: 2}}>Logout</Button>



    </Box>
  )
}
