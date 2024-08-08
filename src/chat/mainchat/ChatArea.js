import { Avatar, Box, Chip, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplyIcon from '@mui/icons-material/Reply';

function ChatArea() {
  return (
    <Box sx={{flex:"1 0 0", overflowY: "auto", bgcolor: "#f9f9f9"}}>
        <Stack direction="row" justifyContent="center" 
            sx={{ py: 2, position: "sticky" , top: 0, zIndex: 2, bgcolor: "#f9f9f9"}}>
            <Chip label="Today" />
        </Stack>
        
        <List sx= {{p:0, overflowY: "auto", flex: "1 0 0"}}>
        <ListItem sx= {{mb: 2}}>
            <Box sx={{display:"flex", width: "80%"}}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src ="https://mui.com/static/images/avatar/1.jpg" />
        </ListItemAvatar>
          <Paper sx ={{width:"100%", p: 1.5}}>
           <ListItemText
           sx={{m:0}}
          primary="Vikas Kumar"
          secondary={
              <Typography
                variant="caption"
                color="text.primary"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              </Typography>
             
          }
           />
           <Box sx= {{ mt: 1, display:"flex", alignItems: "center",justifyContent: "space-between"}}>
            <Typography variant='caption'>
                12:20 PM
            </Typography>
            <Box>
             <IconButton size ="small">
               <ReplyIcon fontSize ="small" />
             </IconButton>
             <IconButton size ="small" color='error'>
               <DeleteOutlineIcon fontSize ="small" />
             </IconButton>
            </Box>
           </Box>
            </Paper>
         </Box>
        </ListItem>

      <ListItem sx={{flexDirection: "row-reverse", mb: 2}}>
            <Box sx={{display:"flex", width: "80%", flexDirection: "row-reverse"}}>
        <ListItemAvatar sx={{display:"flex", flexDirection: "row-reverse"}}>
          <Avatar alt="Remy Sharp" src ="https://mui.com/static/images/avatar/3.jpg" />
        </ListItemAvatar>
          <Paper 
            sx ={{
                width:"100%", 
                p: 1.5, 
                bgcolor: "#ccc"
                }}
            >
           <ListItemText
           sx={{m:0}}
          primary="Kritika Pal"
          secondary={
              <Typography
                variant="caption"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              </Typography>
             
          }
           />
           <Box sx= {{ mt: 1, display:"flex", alignItems: "center",justifyContent: "space-between"}}>
            <Typography variant='caption'>
                12:20 PM
            </Typography>
            <Box>
             <IconButton size ="small">
               <ReplyIcon fontSize ="small" />
             </IconButton>
             <IconButton size ="small" color='error'>
               <DeleteOutlineIcon fontSize ="small" />
             </IconButton>
            </Box>
           </Box>
            </Paper>
         </Box>
      </ListItem>
      <ListItem sx= {{mb: 2}}>
            <Box sx={{display:"flex", width: "80%"}}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src ="https://mui.com/static/images/avatar/1.jpg" />
        </ListItemAvatar>
          <Paper sx ={{width:"100%", p: 1.5}}>
           <ListItemText
           sx={{m:0}}
          primary="Vikas Kumar"
          secondary={
              <Typography
                variant="caption"
                color="text.primary"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              </Typography>
             
          }
           />
           <Box sx= {{ mt: 1, display:"flex", alignItems: "center",justifyContent: "space-between"}}>
            <Typography variant='caption'>
                12:20 PM
            </Typography>
            <Box>
             <IconButton size ="small">
               <ReplyIcon fontSize ="small" />
             </IconButton>
             <IconButton size ="small" color='error'>
               <DeleteOutlineIcon fontSize ="small" />
             </IconButton>
            </Box>
           </Box>
            </Paper>
         </Box>
        </ListItem>
      
        </List>

    </Box>
  )
}

export default ChatArea