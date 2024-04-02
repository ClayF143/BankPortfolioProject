import { Avatar, Tooltip } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { AppState, LogoutOptions, RedirectLoginOptions, User as AuthUser, GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import User from "../types/User"
import UserServices from "../services/UserServices";

interface ILoginProps {
  authUser: AuthUser | undefined;
  loginWithRedirect: (options?: RedirectLoginOptions<AppState> | undefined) => Promise<void>;
  logout: (options?: LogoutOptions | undefined) => Promise<void>;
  setUser: (user: User | null) => void;
  getAccessTokenSilently: (options?: GetTokenSilentlyOptions | undefined) => Promise<string>;
}

function Login({ authUser, loginWithRedirect, logout, setUser, getAccessTokenSilently }: ILoginProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(authUser ? true : false);

  const getCurrentUser = async () => {
    const currUser = await UserServices.fetchCurrentUser({ getAccessTokenSilently });
    setUser(currUser);
  };

  useEffect(() => {
    setIsLoggedIn(authUser != null);
  }, [authUser]);

  useEffect(() => {
    if(isLoggedIn)
      getCurrentUser();
  }, [isLoggedIn])
  
  const handleProfileClick = () => {
    isLoggedIn ? logout() : loginWithRedirect();
  };

  return (
    <Tooltip placement="bottom" title={isLoggedIn ? authUser?.email : "Login"} color="blue">
      <Avatar
        className="avatar-hover-effect"
        src={authUser?.picture}
        onClick={handleProfileClick}
      >
        {isLoggedIn ? <></> : <UserOutlined />}
      </Avatar>
    </Tooltip>
  );
}

export default Login;