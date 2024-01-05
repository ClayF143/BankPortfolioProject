import { useEffect, useState } from 'react';
import './App.css';
import config from './config';

function App() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await fetch(`${config.baseApiUrl}/user`);
        console.log("response " + response);
        const data = await response.json();
        console.log("data " + data)
        setUsers(data);
        console.log("user1: " + data[0]);
        console.log(data[0]);
    }
    fetchUsers();

    return (
        <div>
            hoi this is the app

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

export default App;