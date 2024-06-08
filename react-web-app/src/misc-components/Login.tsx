import { Tooltip } from "antd";
import { useAuth } from "../MyAuthProvider";
import { useEffect } from "react";
import { Avatar } from "@mui/material";

function Login() {
  const { isAuthenticated, authUser, loginWithRedirect, logout } = useAuth();
  const handleProfileClick = () => {
    isAuthenticated ? logout() : loginWithRedirect();
  };

  useEffect(() => {
    console.log(authUser?.picture)
  }, [authUser?.picture])

  return (
    <Tooltip placement="bottom" title={isAuthenticated ? "Logout" : "Login"} color="blue">
      <Avatar
        className="avatar-hover-effect"
        src={authUser?.picture}
        onClick={handleProfileClick}
        slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
      />
    </Tooltip>
  );
}

export default Login;