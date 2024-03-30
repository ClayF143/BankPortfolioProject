import { Avatar, Tooltip } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { AppState, LogoutOptions, RedirectLoginOptions, User } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

interface ILoginProps {
  user: User | undefined;
  loginWithRedirect: (options?: RedirectLoginOptions<AppState> | undefined) => Promise<void>;
  logout: (options?: LogoutOptions | undefined) => Promise<void>;
}

function Login({ user, loginWithRedirect, logout }: ILoginProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);

  useEffect(() => {
    setIsLoggedIn(user ? true : false);
  }, [user]);
  
  const handleProfileClick = () => {
    isLoggedIn ? logout() : loginWithRedirect();
  };

  return (
    <Tooltip placement="bottom" title={isLoggedIn ? "Logout" : "Login"} color="blue">
      <Avatar
        className="avatar-hover-effect"
        src={user?.picture}
        onClick={handleProfileClick}
      >
        {isLoggedIn ? <></> : <UserOutlined />}
      </Avatar>
    </Tooltip>
  );
}

export default Login;