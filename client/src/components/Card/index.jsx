import React from "react";
import {
  Stack,
  Typography,
  OutlinedInput,
  Box,
  FormHelperText,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import InfoIcon from "@mui/icons-material/Info";

const Card = ({ post, socket, user }) => {
  const [isLike, setIsLike] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const handleNotification = (notiType) => {
    notiType === 1 && setIsLike(true);
    socket.emit("sendNotification", {
      senderName: user.name,
      receiverName: post.username,
      type: notiType,
    });
  };

  const isValidated = () => {
    const errs = {};
    if (!message) errs.message = "Please input message!";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const clearError = () => {
    setErrors({});
  };

  const handleMessage = () => {
    if (!isValidated()) return;

    socket.emit("sendMessage", {
      senderName: user.name,
      receiverName: post.username,
      text: message,
    });
    setMessage("");
  };

  const handleChange = (e) => {
    clearError();
    setMessage(e.target.value);
  };

  return (
    <Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{ padding: "10px", alignItems: "center" }}
      >
        <Stack
          width="30px"
          height="30px"
          sx={{
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={post.userImg}
            alt="UserImage"
            style={{ width: "100%", borderRadius: "50%" }}
          />
        </Stack>
        <Typography>{post.fullname}</Typography>
      </Stack>
      <Stack
        width="100%"
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={post.postImg} alt="UserImage" style={{ width: "100%" }} />
        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            fullWidth
            placeholder="Send message..."
            value={message}
            error={!!errors.message}
            onChange={handleChange}
          />
          {errors.message && (
            <FormHelperText sx={{ ml: 1.5 }} error>
              {errors.message}
            </FormHelperText>
          )}
        </Box>
      </Stack>
      <Stack direction="row" spacing={3} sx={{ padding: "10px" }}>
        <FavoriteIcon
          onClick={() => handleNotification(1)}
          sx={{ color: isLike ? "red" : "inherit", cursor: "pointer" }}
        />
        <ChatBubbleOutlineIcon
          sx={{ cursor: "pointer" }}
          onClick={handleMessage}
        />
        <ShareIcon
          sx={{ cursor: "pointer" }}
          onClick={() => handleNotification(3)}
        />
        <InfoIcon sx={{ cursor: "pointer" }} />
      </Stack>
    </Stack>
  );
};

export default Card;
