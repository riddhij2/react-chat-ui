import { Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SideBar from "./sidebar";
import ChatBox from "./mainchat";
import Profile from "./profile";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const PATH = "http://localhost:5000";

// Helper function to format message data
const formatMessageData = (data) => {
  // console.log("data", data)
  return {
    id: data.id || null,
    msg: data.msg || "",
    sender_id: data.sender?.userId || data.sender_id || null,
    sender_name: data.sender?.name || data.sender_name || "",
    receiver_id: data.receiver?.userId || data.receiver_id || null,
    receiver_name: data.receiver?.name || data.receiver_name || "",
    created_at: data.created_at || new Date().toISOString(),
  };
};

const Chat = () => {
  const socketRef = useRef();
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allMsg, setAllMsg] = useState([]);
  const [roomData, setRoomData] = useState({
    roomData: null,
    receiver: null,
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) navigate("/");
    const socket = io.connect(PATH);
    socketRef.current = socket;
    socket.on("connect", () => setIsConnected(true));
    socket.off("disconnect", () => setIsConnected("false"));

    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    if (isConnected) {
      socketRef.current.emit("ADD_USER", state);
      socketRef.current.on("USER_ADDED", (data) => {
        setOnlineUsers(data);
      });
      socketRef.current.on("RECEIVED_MSG", (data) => {
        // console.log("Received Message Data:", data); // Check data here
  
        const formattedData = formatMessageData(data);
        // console.log("Formatted Data:", formattedData);
        setAllMsg((prevState) => [...prevState, formattedData]);
      });

        // Listen for deleted messages
        socketRef.current.on("DELETED_MSG", (data) => {
           console.log("Message Deleted Data:", data.msg.id);
           setAllMsg((prevState) => prevState.filter((item) => item.id !== data.msg.id));
        });

      return () => socketRef.current.disconnect();
    }
  }, [isConnected]);

  const handleSendMsg = (msg) => {
    if (socketRef.current.connected) {
      const data = {
        msg,
        receiver: { ...roomData.receiver },
        sender: { ...state },
      };
      socketRef.current.emit("SEND_MSG", data);

    }
  };

  const handleDelete = (id) => {
    console.log("Deleting message with ID:", id);
  
    axios
      .delete(`http://localhost:5000/message/${id}`)
      .then((res) => {
        console.log("Delete response:", res.data);
        if (res.data.success !== false && res.data.data.id) {
         

           // Emit message deletion to the server
        if (socketRef.current.connected) {
          const data = {
            msg: res.data.data,
            receiver: roomData.receiver
          }
          socketRef.current.emit("DELETE_MSG", data);

          //  setAllMsg((prevState) => {
          //   const newMsgList = prevState.filter((data) => data.id !== res.data.data.id);
          //   console.log('Updated Message List:', newMsgList);
          //   return newMsgList;
          // });
        }

        
          // Test by forcing the state update
          setAllMsg((prevState) => prevState.filter((msg) => msg.id !== id));
        }
      })
      .catch((err) => {
        console.error("Error during message deletion:", err);
      });
  };

  if (!state) return null;

  return (
    <Paper square elevation={0} sx={{ height: "100vh", display: "flex" }}>
      <SideBar
        user={state}
        onlineUsers={onlineUsers}
        roomData={roomData}
        setRoomData={setRoomData}
        setAllMsg={setAllMsg}
      />
      <ChatBox
        roomData={roomData}
        handleSendMsg={handleSendMsg}
        allMsg={allMsg}
        user={state}
        handleDelete={handleDelete}
      />
      <Profile user={state} />
    </Paper>
  );
};

export default Chat;
