import { Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react"
import SideBar from "./sidebar";
import ChatBox from "./mainchat";
import Profile from "./profile";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const PATH = "http://localhost:5000"


const Chat =() =>{
    const socketRef = useRef();
    const [isConnected, setIsConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const { state } = useLocation();
    const navigate = useNavigate()

    // console.log(state.name);
    useEffect(() => {
      if(!state) navigate("/")
        const socket = io.connect(PATH);
        socketRef.current = socket;
        socket.on("connect", () => setIsConnected(true))
        socket.off("disconnect", () => setIsConnected("false"));
       
    //   console.log(socket)
      
    }, [])

    useEffect(() => {
      if(isConnected){
        socketRef.current.emit("ADD_USER", state);
        socketRef.current.on("USER_ADDED", (data) =>{
            // console.log("data", data)
            setOnlineUsers(data)
        })

      }
    
      
    }, [isConnected])
    
    

    if(!state) return null;

    return(
        <Paper square elevation={0} sx={{height: "100vh", display:"flex"}}>
            <SideBar user ={state} onlineUsers= {onlineUsers}/>
            <ChatBox />
            <Profile user ={state} />
        </Paper>
    )
}

export default Chat;