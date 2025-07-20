import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Sidebar from "../../components/Sidebar/Sidebar";
import MainFooter from "../../components/Footer/MainFooter";
import Scroll from "../../components/Scroll/Scroll";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const User = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socketURL =
      process.env.REACT_APP_SOCKET_URL || "http://localhost:8000";
    setSocket(io(socketURL));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user.firstname, user.lastname, user._id);
  }, [user, socket]);
  return (
    <>
      <Header socket={socket} />
      <Main socket={socket} />
      <Sidebar />
      <MainFooter />
      <Scroll />
    </>
  );
};

export default User;
