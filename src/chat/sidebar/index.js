import React from "react"
import Header from "./Header";
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from "axios";


const SideBar= ({ user, onlineUsers, roomData, setRoomData, setAllMsg }) =>{
  // console.log("onlineUser:", onlineUsers)

    const [value, setValue] = React.useState(0);
    const [selectedMessageId, setSelectedMessageId] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleChatRoom = (user) =>{
      // console.log("user", user)
      setRoomData({
        ...roomData,
        room: "test",
        receiver: {
          ...user, 
          userId: user.userId // Explicitly include userId
        }
      });
      axios
      .get(`http://localhost:5000/message/${user.userId}`)
      .then((res) => {
        // console.log("res",res)
        if (res.data.data) {
          // Update the selected message ID and other state as needed
          setSelectedMessageId(res.data.data.id);
          setAllMsg(res.data.data); // Assuming res.data.data contains the message data
        }

      })
      .catch((err) =>{
        console.log(err)
      })

    }
    return (
   <Box sx={{width: "25vw", display:"flex", flexDirection: "column", height: "100vh"}}>
   <Header user = {user}/>
        <Tabs value={value} onChange={handleChange}
        aria-label="basic tabs example"
        variant="fullWidth">
          <Tab 
          icon={<ChatBubbleOutlineIcon fontSize= "small"/>} 
          iconPosition="start" 
          label="Chat List" 
          sx={{minHeight:"inherit"}}
          />
          <Tab 
          icon={<PersonIcon fontSize= "small"/>} 
          iconPosition="start" 
          label="User List" 
          sx={{minHeight:"inherit"}}
          />
        </Tabs>
        {value === 0 && (

        <List sx={{p:0, overflowY: "auto", flex:"1 0 0"}}>
          
          {
            
            onlineUsers
            .filter((ele) => ele.userId !== user.userId)
            .map((item) => {
              // console.log("Item:", item);
             return( 
            <React.Fragment key={item.userId}>
              <ListItem alignItems="flex-start" onClick={() => handleChatRoom(item)}>
                <ListItemAvatar>
                  <Avatar alt={item.name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <Typography
                      variant="caption"
                      color="text.primary"
                    >
                      {item.email}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>)

            })
          }
      
    </List>
    )}

    {value === 1 && (<div>1</div>)}
        
  
   </Box>
    )
}

export default SideBar;