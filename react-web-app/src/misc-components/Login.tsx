import { Avatar, Tooltip } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from "../MyAuthProvider";

function Login() {
  const { isAuthenticated, authUser, loginWithRedirect, logout } = useAuth();
  const handleProfileClick = () => {
    isAuthenticated ? logout() : loginWithRedirect();
  };

  return (
    <Tooltip placement="bottom" title={isAuthenticated ? "Logout" : "Login"} color="blue">
      <Avatar
        className="avatar-hover-effect"
        src={authUser?.picture}
        onClick={handleProfileClick}
      >
        {isAuthenticated ? <></> : <UserOutlined />}
      </Avatar>
    </Tooltip>
  );
}

export default Login;