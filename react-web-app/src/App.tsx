import './App.css';
import { useEffect, useState } from 'react';
import UserServices from './services/UserServices';
import User from './types/User';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './Profile';

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    /*
    useEffect(() => {
        UserServices.fetchUsers().then((data) => {
            setUsers(data);
        });
    }, []);
*/
    return (
        /*
        <div>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        */
       <div>
            hi
            <button onClick={() => loginWithRedirect()}>Log In</button>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
            </button>
            <Profile />
       </div>
    )
}

export default App;