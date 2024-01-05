import { useEffect, useState } from 'react';
import './App.css';
import UserServices from './Services/UserServices';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserServices.fetchUsers().then((data) => {
            setUsers(data);
        });
        console.log('reload');
    }, []);

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