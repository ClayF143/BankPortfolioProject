import { useEffect, useState } from 'react';
import UserServices from '../services/UserServices';
import User from '../types/User';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useAuth } from '../MyAuthProvider';

function UserList() {
    const [users, setUsers] = useState<User[]>([]);

    const [columnDefs] = useState<ColDef[]>([
        { headerName: "ID", field: "id" },
        { headerName: "First Name", field: "firstName" },
        { headerName: "Last Name", field: "lastName" },
        { headerName: "Email", field: "email" },
    ]);
    
    const getData = async () => {
        const { accessToken } = useAuth();
        const res = await UserServices.fetchUsers(accessToken);
        setUsers(res);
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: '90%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={users}
                onGridReady={getData}>
            </AgGridReact>
        </div>
    );
}

export default UserList;