import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import  InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';


function Footer({ handleSendMsg }) {
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
    <Box sx={{p:1 , display: "flex"}}>
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