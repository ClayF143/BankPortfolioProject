import './App.css';
import { useEffect, useState } from 'react';
import UserServices from './services/UserServices';
import User from './types/User';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './Profile';
import config from './config';

function App() {
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
            <Profile />
       </div>
    )
}

export default App;