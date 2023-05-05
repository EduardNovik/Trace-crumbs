import React from "react";
import { useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

import { useDispatch, useSelector } from "react-redux";
import { fetchGoogleAccount, updateProfileIdState, updateSignInDataState } from "../../rdx/signInSlice";

const SignIn = () => {

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const signInData = useSelector((state) => state.signIn.data);
  const signInId = useSelector((state) => state.signIn.profileId);

  const login = 
    useGoogleLogin({
    onSuccess: (codeResponse) => {
      dispatch(fetchGoogleAccount(`${codeResponse.access_token}`))
    },
    onError: (error) => console.log("Login Failed:", error),
  })

  const logOut = () => {
    googleLogout();
    dispatch(updateSignInDataState(null))
    dispatch(updateProfileIdState(null))
  };


  return (
    <Box sx={{ flexGrow: 0 }}>
      {signInData ? (
        <Stack direction="row" sx={{ gap: 5, alignItems: "center" }}>
          <Typography
            color={"text.primary"}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {signInData.name}
          </Typography>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="user image" src={signInData.picture} />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <Box>
          <Button
            onClick={() => login()}
            sx={{
              display: { xs: "none", md: "flex" },
              color: "text.primary",
              textAlign: "center",
              textTransform: "inherit",
              transition: 'all 0.2s',
              "&:hover": { boxShadow: "0px 0px 20px 0px dimgray", transform: 'scale(90%)'}
            }}
          >
            Sign in with <FcGoogle style={{ marginLeft: "8px" }} />
          </Button>
          <Button
            onClick={() => login()}
            size='small'
            sx={{
              display: { xs: "flex", md: "none" },
              color: "text.primary",
              textAlign: "center",
              textTransform: "inherit",
              p:'0px',
              minWidth:'48px',
              letterSpacing:'0px',
              "&:hover": { boxShadow: "0px 0px 25px 0px lightgrey" },
            }}
          >
            Sign in
          </Button>
        </Box>
      )}
      {signInData && (
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Stack>
            <Button
              variant="white"
              onClick={() => {
                logOut(), handleCloseUserMenu();
              }}
              sx={{
                textTransform: "inherit",
                fontSize: "1rem",
                fontWeight: "400",
              }}
            >
              Log out
            </Button>
          </Stack>
        </Menu>
      )}
    </Box>
  );
};

export default SignIn;
