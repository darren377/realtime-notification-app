import React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  ClickAwayListener,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [openNotification, setOpenNotification] = React.useState(false);
  const [openMessage, setOpenMessage] = React.useState(false);

  const displayNotification = ({ senderName, type }) => {
    let action = "";

    if (type === 1) {
      action = "Liked your post";
    } else if (type === 2) {
      action = "Commented your post";
    } else {
      action = "Shared your post";
    }

    return <Typography>{`${senderName}: ${action}`}</Typography>;
  };

  const displayMessage = ({ senderName, text }) => {
    return <Typography>{`${senderName}: ${text}`}</Typography>;
  };

  const handleReadNotification = () => {
    setNotifications([]);
    setOpenNotification(false);
  };

  const handleReadMessage = () => {
    setMessages([]);
    setOpenMessage(false);
  };

  const handleOpenNotification = () => {
    setOpenNotification(!openNotification);
    setOpenMessage(false);
  };

  const handleOpenMessage = () => {
    setOpenMessage(!openMessage);
    setOpenNotification(false);
  };

  const handleClickAway = () => {
    setOpenMessage(false);
    setOpenNotification(false);
  };

  React.useEffect(() => {
    const handleGetNotification = (receivedData) => {
      setNotifications((prev) => [...prev, receivedData]);
    };

    const handleGetMessages = (receivedData) => {
      setMessages((prev) => [...prev, receivedData]);
    };

    socket.on("getNotification", handleGetNotification);
    socket.on("getMessage", handleGetMessages);

    return () => {
      socket.off("getNotification", handleGetNotification);
      socket.off("getMessage", handleGetMessages);
    };
  }, [socket]);

  return (
    <Stack
      direction="row"
      spacing={10}
      backgroundColor="lightgreen"
      sx={{
        padding: "20px",
        position: "relative",
        borderRadius: "5px 5px 0 0",
      }}
    >
      <Typography>Realtime Notification App</Typography>
      <Stack direction="row" spacing={3}>
        <Stack
          direction="row"
          sx={{ alignItems: "center", position: "relative", cursor: "pointer" }}
          onClick={handleOpenNotification}
        >
          <NotificationsIcon />
          {notifications.length > 0 && (
            <Stack
              width="15px"
              height="15px"
              sx={{
                backgroundColor: "red",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                position: "absolute",
                top: -5,
                left: 10,
              }}
            >
              <Typography color="#fff" fontSize={12}>
                {notifications.length}
              </Typography>
            </Stack>
          )}
        </Stack>
        <Stack
          direction="row"
          sx={{ alignItems: "center", position: "relative", cursor: "pointer" }}
          onClick={handleOpenMessage}
        >
          <EmailIcon />
          {messages.length > 0 && (
            <Stack
              width="15px"
              height="15px"
              sx={{
                backgroundColor: "red",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                position: "absolute",
                top: -5,
                left: 10,
              }}
            >
              <Typography color="#fff" fontSize={12}>
                {messages.length}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>

      <Stack
        sx={{
          position: "absolute",
          right: 0,
          top: 64,
          padding: "10px 20px",
          backgroundColor: "#fff",
        }}
      >
        {openNotification && notifications.length > 0 && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Stack>
              {notifications?.map((item, index) => (
                <Box key={index}>{displayNotification(item)}</Box>
              ))}
              <Button onClick={handleReadNotification}>Mark as read</Button>
            </Stack>
          </ClickAwayListener>
        )}
        {openMessage && messages.length > 0 && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Stack>
              {messages?.map((item, index) => (
                <Box key={index}>{displayMessage(item)}</Box>
              ))}
              <Button onClick={handleReadMessage}>Mark as read</Button>
            </Stack>
          </ClickAwayListener>
        )}
      </Stack>
    </Stack>
  );
};

export default Navbar;
