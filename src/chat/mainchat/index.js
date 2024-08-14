import { Box } from '@mui/material'
import React from 'react'
import Header from './Header'
import ChatArea from './ChatArea'
import Footer from './Footer'

export default function ChatBox({ roomData, handleSendMsg, allMsg, user }) {
  return (
    <Box sx={{width: "55vw",display:"flex", height: "100%" ,flexDirection: "column"}}>
        
        {roomData.room ? <> 
        <Header roomData = {roomData}/>
        <ChatArea 
          allMsg = {allMsg} 
          user={user}
        />
        <Footer handleSendMsg = {handleSendMsg}/>
        </> : <> 
        Please select user to chat
        </>
        }
       

    </Box>
  )
}
