import './App.css';
import { useEffect, useState } from 'react';
import UserServices from './services/UserServices';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './Profile';
import config from './config';
import UserList from './UserList';

function App() {
    const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();

    return (
       <div>
            <button onClick={() => loginWithRedirect()}>Log In</button>
            {isAuthenticated && (
                <>
                    <UserList
                        getAccessTokenSilently={getAccessTokenSilently}
                    />
                    
                </>
            )}
       </div>
    )
    /*
    <Profile 
                        user={user}
                        getAccessTokenSilently={getAccessTokenSilently}
                    />
                    */
}

export default App;