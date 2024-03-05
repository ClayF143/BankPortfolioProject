import './App.css';
import { useEffect, useState } from 'react';
import UserServices from './services/UserServices';
import User from './types/User';

function App() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        UserServices.fetchUsers().then((data) => {
            setUsers(data);
        });
    }, []);

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

export default App;