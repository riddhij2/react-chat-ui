import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import  InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';

function Footer({ handleSendMsg, replyMsg, setReplyMsg }) {
    const [msg, setMsg] = useState("");
    const handleChange = (event) =>{
        //set the text msg
        setMsg(event.target.value)
    }
    const handleSubmit =(event) =>{
        //to prevent the refersh of page after submission
        event.preventDefault();
        if(msg){
            handleSendMsg(msg);
        }
        //to empty the input box
        setMsg("");
        
    }
  return (
    <Box sx={{p:1 , display: "flex",position: "relative"}}>
        {replyMsg && 
        (<Box 
           sx={{
            position: "absolute", 
            left: 0, 
            right: 0, 
            bottom:"57px", 
            background:"#ddd",
            p:1,
            borderLeft: "4px solid",
            borderColor: "primary.light"
            }}
            >
                <Typography>
                    {replyMsg.sender_name}
                </Typography>
                <Typography variant='caption'>
                    {replyMsg.msg}
                </Typography>
                <IconButton aria-label="close" 
                onClick={() => setReplyMsg(null)}
                    sx ={{position: "absolute", right: 0, top: 0}}>
                    <CloseIcon />
                </IconButton>
        </Box>)
        }
        <Box sx={{display: "flex", alignItems: "center "}}>
        <Button sx={{minWidth: "auto", mr: 1}}>
            <MoreVertIcon />
        </Button>

        <Button sx={{minWidth: "auto", mr: 1}}>
            <InsertEmoticonIcon />
        </Button>
        </Box>
       
        <Box 
            sx={{display:"flex", flex: 1}} 
            component="form"
            //submit the textmessage
            onSubmit={handleSubmit}>
        <TextField 
         fullWidth
         placeholder='Type your message and hit send'
         size="small"
         sx={{"& .MuiInputBase-root": {
            borderRadius: 0,
            borderRight: 0
            },
         }} 
         //to empty the text input
         value={msg}
         //set text in the message to send the server 
         onChange={handleChange}
         
         />
        <Button 
            type='submit'
            variant='outlined'
            sx={{
                borderRadius: 0,
                minWidth: "auto",
                height: "100%"
            }}>Send</Button>
        </Box>

    </Box>
  )
}

export default Footer