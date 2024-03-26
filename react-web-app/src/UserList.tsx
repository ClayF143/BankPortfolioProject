import './App.css';
import { useEffect, useState } from 'react';
import UserServices from './services/UserServices';
import User from './types/User';
import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface IUserListProps {
    getAccessTokenSilently: (options?: GetTokenSilentlyOptions | undefined) => Promise<string>;
}

function UserList({ getAccessTokenSilently }: IUserListProps) {
    const [users, setUsers] = useState<User[]>([]);

    const [columnDefs] = useState<ColDef[]>([
        { headerName: "ID", field: "id" },
        { headerName: "First Name", field: "firstName" },
        { headerName: "Last Name", field: "lastName" },
        { headerName: "Email", field: "email" },
    ]);
    
    const getData = async () => {
        const res = await UserServices.fetchUsers({ getAccessTokenSilently });
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