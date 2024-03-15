import './App.css';
import { useEffect, useState } from 'react';
import UserServices from './services/UserServices';
import User from './types/User';
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import Profile from './Profile';
import config from './config';

interface IUserListProps {
    getAccessTokenSilently: (options?: GetTokenSilentlyOptions | undefined) => Promise<string>;
}

function UserList({ getAccessTokenSilently }: IUserListProps) {
    const [users, setUsers] = useState<User[]>([]);
    
    const getData = async () => {
        const domain = "https://bank_api.com";
        const accessToken = await getAccessTokenSilently({
            authorizationParams: {
                audience: `${domain}`,
            },
        });
        
        const url = `${domain}/User`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log(response.json());
        
    }

    useEffect(() => {
        getData();
    })

    return (
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
    )
}

export default UserList;