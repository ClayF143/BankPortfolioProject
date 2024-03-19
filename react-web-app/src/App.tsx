import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './Profile';
import UserList from './UserList';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';

function App() {
    const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect, getAccessTokenWithPopup } = useAuth0();

    const [showProfile, setShowProfile] = useState(false);
    return (
       <div>
            <button onClick={() => loginWithRedirect()}>Log In</button>
            <button onClick={() => setShowProfile(!showProfile)}>Show Profile</button>
            {isAuthenticated && (
                <UserList
                    getAccessTokenSilently={ getAccessTokenSilently }
                />
            )}
            {showProfile && (
                <Profile 
                    user={user}
                    getAccessTokenWithPopup={ getAccessTokenWithPopup }
                />
            )}
            <Dashboard />
       </div>
    )
}

export default App;