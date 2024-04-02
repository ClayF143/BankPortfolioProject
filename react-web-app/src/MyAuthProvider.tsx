import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth0, User as AuthUser, RedirectLoginOptions, AppState, LogoutOptions } from '@auth0/auth0-react';
import User from './types/User';
import UserServices from './services/UserServices';
import config from './config';

interface AuthContextType {
  accessToken: string;
  isAuthenticated: boolean;
  authUser: AuthUser | undefined;
  myUser: User | null;
  loginWithRedirect: (options?: RedirectLoginOptions<AppState> | undefined) => Promise<void>;
  logout: (options?: LogoutOptions | undefined) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: "",
  isAuthenticated: false,
  authUser: undefined,
  myUser: null,
  loginWithRedirect: async (options?: RedirectLoginOptions) => {
    console.warn("loginWithRedirect function not implemented", options);
  },
  logout: async (options?: LogoutOptions) => {
    console.warn("logout function not implemented", options);
  }
});

interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
const MyAuthProvider = ({ children }: AuthProviderProps) => {
  const { getAccessTokenSilently, user: authUser , isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [accessToken, setAccessToken] = useState<string>("");
  const [myUser, setMyUser] = useState<User | null>(null);

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const token = (await getAccessTokenSilently({
          authorizationParams: {
              audience: `${config.auth0ApiIdentifier}`
          }
        })) ?? "";
        setAccessToken(token);

        const currUser = await UserServices.fetchCurrentUser(token);
        setMyUser(currUser);
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return <AuthContext.Provider value={{ accessToken, isAuthenticated, authUser, myUser, loginWithRedirect, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextType => useContext(AuthContext);

export { MyAuthProvider, useAuth };
