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
    const [allMsg, setAllMsg] = useState([])
    const [roomData, setRoomData] = useState({
      roomData: null,
      receiver: null
    });


    const { state } = useLocation();
    // console.log('Initial State (Sender):', state);
    const navigate = useNavigate();

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
        });
        socketRef.current.on("RECEIVED_MSG", (data) =>{
          console.log(data, "from another user")
          console.log("Received Data:", data);
          console.log("Sender:", data.sender); 
          console.log("Receiver:", data.receiver);
          setAllMsg((prevState) => [...prevState, data])
        })
        //when the online user logout it is removed from chatlist
        return () => socketRef.current.disconnect();

      }
    
      
    }, [isConnected])

    const handleSendMsg = (msg) =>{
      console.log('Reciever State:', roomData.receiver); 
      console.log('sender State:', state); 
      if(socketRef.current.connected){
        const data ={
          msg, 
          receiver: { ...roomData.receiver }, // Cloning to prevent mutations
          sender: { ...state },               // Cloning to prevent mutations
        }
        socketRef.current.emit("SEND_MSG", data)
        setAllMsg((prevState) => [...prevState, data])

      }
    };
   
    if(!state) return null;

    return(
        <Paper square elevation={0} sx={{height: "100vh", display:"flex"}}>
            <SideBar 
                user ={state} 
                onlineUsers= {onlineUsers} 
                roomData = {roomData}
                setRoomData ={setRoomData}
                setAllMsg = {setAllMsg}
                />
            <ChatBox 
                roomData ={roomData} 
                handleSendMsg ={handleSendMsg}
                allMsg={allMsg}
                user ={state} 
                />
            <Profile user ={state} />
        </Paper>
    )
}

export default Chat;