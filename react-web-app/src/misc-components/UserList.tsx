import { useEffect, useState } from 'react';
import UserServices from '../services/UserService';
import User from '../types/User';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useAuth } from '../MyAuthProvider';

function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const { accessToken, isAuthenticated } = useAuth();

    const [columnDefs] = useState<ColDef[]>([
        { headerName: "ID", field: "id" },
        { headerName: "First Name", field: "firstName" },
        { headerName: "Last Name", field: "lastName" },
        { headerName: "Email", field: "email" },
    ]);
    
    const getData = async () => {
        const res = isAuthenticated ? await new UserServices().fetchAll(accessToken) : [];
        setUsers(res);
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: columnDefs.length * 200 }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={users}
                onGridReady={getData}
            />
        </div>
    );
}

export default UserList;