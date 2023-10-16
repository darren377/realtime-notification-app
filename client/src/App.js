import React from "react";
import { io } from "socket.io-client";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Button, Stack, Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { posts } from "./components/Card/consts";

function App() {
  const [userName, setUserName] = React.useState("");
  const [user, setUser] = React.useState({ name: "" });
  const [socket, setSocket] = React.useState(null);

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleClick = () => {
    setUser({ name: userName });
  };

  React.useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  React.useEffect(() => {
    if (user.name) {
      socket?.emit("newUser", user.name);
    }
  }, [user, socket]);

  return (
    <Stack
      width="100%"
      height="100%"
      minHeight="100vh"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {user.name ? (
        <Stack
          width="100%"
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Stack
            width="500px"
            sx={{ border: "1px solid #000", borderRadius: "5px" }}
          >
            <Navbar socket={socket} />
            {posts.map((post, index) => (
              <Card key={index} post={post} socket={socket} user={user} />
            ))}
            <Typography
              sx={{
                position: "absolute",
                top: 50,
                right: 50,
                color: "red",
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
            >
              {user.name}
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <Stack
          spacing={2}
          sx={{
            width: "500px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            autoComplete="off"
            sx={{ width: "100%" }}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            sx={{ width: "120px", height: "50px" }}
            onClick={handleClick}
          >
            Login
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export default App;
