import { Avatar, Box, Chip, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplyIcon from '@mui/icons-material/Reply';

function ChatArea({ allMsg, user, handleDelete,setReplyMsg }) {
  console.log("allMsg", allMsg)
  // console.log("user", user)

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${hours}:${minutes} ${ampm}`;
  };
  
  return (
    <Box sx={{flex:"1 0 0", overflowY: "auto", bgcolor: "#f9f9f9"}}>
        <Stack direction="row" justifyContent="center" 
            sx={{ py: 2, position: "sticky" , top: 0, zIndex: 2, bgcolor: "#f9f9f9"}}>
            <Chip label="Today" />
        </Stack>
        <List sx= {{p:0, overflowY: "auto", flex: "1 0 0"}}>
          {allMsg.map((item) => (
            
            
            <ListItem  
            key={item.id}  
            sx= {item.sender_id === user.userId
                ? {flexDirection: "row-reverse", mb: 2} 
                : {mb: 2}
              }
            >
            <Box sx={item.sender_id === user.userId 
                ? {display:"flex", width: "80%" , flexDirection: "row-reverse"} 
                : {display:"flex", width: "80%"}
              }
            >
        <ListItemAvatar sx={item.sender_id === user.userId 
           ? { display: "flex", flexDirection: "row-reverse" } 
           : {}  // Provide an empty object if the condition is false
         }
        >
        <Avatar 
            alt={item.sender_name}  
            src ="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
          <Paper sx ={item.sender_id === user.userId 
              ? {width:"100%", p: 1.5, bgcolor: "primary.light"} 
              : {width:"100%", p: 1.5}
              }
          >
            {item.replyMsg && 
            <Paper sx ={item.sender_id !== user.userId 
              ? { p: 1.5, mb: 1, bgcolor: "primary.light"} 
              : { p: 1.5, mb: 1}
              }
          >
            <ListItemText
           sx={item.sender_id !== user.userId 
              ? {m:0, color: "primary.contrastText"} 
              : {m:0}
            }
           primary={item.replyMsg.sender_name}
           secondary={
              <Typography
                variant="caption"
              >{item.replyMsg.msg}
              </Typography>
            }
          />
          </Paper>
          
          }


          <ListItemText
           sx={item.sender_id === user.userId 
              ? {m:0, color: "primary.contrastText"} 
              : {m:0}
            }
           primary={item.sender_name}
           secondary={
              <Typography
                variant="caption"
              >{item.msg}
              </Typography>
            }
          />
           <Box sx= {{ mt: 1, display:"flex", alignItems: "center",justifyContent: "space-between"}}>
            <Typography variant='caption'
             sx={item.sender_id === user.userId 
              ? { color: "primary.contrastText" } 
              : {}  
            }
              >
                {formatTime(item.created_at)}
            </Typography>
            <Box>
             <IconButton onClick={() => setReplyMsg(item)} size ="small">
               <ReplyIcon fontSize ="small" />
             </IconButton>
             {/* {item.sender_id === user.userId &&
              <IconButton size ="small" color='error' onClick={() => {handleDelete (item.id)}}>
               <DeleteOutlineIcon fontSize ="small" />
             </IconButton> 
            } */}
            </Box>
           </Box>
            </Paper>
         </Box>
            </ListItem>
          ))}
        </List>

    </Box>
  )
}

export default ChatArea
