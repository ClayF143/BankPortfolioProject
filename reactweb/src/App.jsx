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
        console.log(users);
    }
    fetchUsers();

    return (
        <div>
            hoi this is the app
            { users[0].firstName }
        </div>
    )
}

export default App;