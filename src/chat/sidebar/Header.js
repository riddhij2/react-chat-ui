import { Avatar, Card, CardHeader, IconButton, Typography } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Header({ user }) {
  return (
    <Card sx={{ 
        bgcolor: "primary.light",
        color: "primary.contrastText",
        borderRadius: 0,
        }}>
    <CardHeader
      avatar={
        <Avatar src ="https://mui.com/static/images/avatar/3.jpg">
        </Avatar>
      }
      action={
        <IconButton 
           aria-label="settings" 
           sx={{color: "primary.contrastText"}}>
          <MoreVertIcon />
        </IconButton>
      }
      title={user.name}
      subheader={
        <Typography variant="caption">Frontend Developer</Typography>
      }
    />
    </Card>
  )
}
