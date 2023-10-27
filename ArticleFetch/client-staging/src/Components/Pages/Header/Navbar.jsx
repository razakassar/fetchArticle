import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../ContextApi";

export default function Navbar() {
  const { setContextUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
      if (user?._id) {
        setContextUser({});
        navigate("/Signin");
      } else {
        navigate("/SignUp");
      }
  }
  return (
    <Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            <AutoStoriesIcon sx={{
                width: "4rem",
                height: "4rem",
                marginLeft: "1.5rem",
                marginTop: "0.5rem"
              }} />
          </Typography>
          <Button
            onClick={handleSignOut}
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
          >
            {user?._id ? 'logout' : 'SignUp'}
          </Button>

        </Toolbar>
      </AppBar>
    </Fragment>
  );
}
