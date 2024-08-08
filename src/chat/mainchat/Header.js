import { Avatar, Button, Card, CardHeader, IconButton, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';

export default function Header() {
  return (
    <Card sx={{ 
        borderRadius: 0,
        }}
        elevation={0}
    >
        
    <CardHeader
      
      
      avatar={
        <>
        <Button sx={{minWidth: "auto", mr: 1}}>
            <ArrowBackIcon />
        </Button>
        
        <Avatar src ="https://mui.com/static/images/avatar/1.jpg">
        </Avatar>
        </>
      }
      action={
        <>
        <IconButton>
           <VideoCallIcon />
        </IconButton>
        <IconButton>
           <CallIcon />
        </IconButton>
        </>
      }
      title="Vikas Kumar"
      subheader={
        <Typography variant="caption">Developer</Typography>
      }
    />
    </Card>
  )
}
