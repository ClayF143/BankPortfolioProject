import { useState } from "react";
import AddTransaction from "./AddTransaction";
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

interface IRow {
    make: string;
    model: string;
    price: number;
    electric: boolean;
}

function Transaction() {
    const [rowData, setRowData] = useState<IRow[]>([
        { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
        { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
        { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
        { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
        { make: 'Fiat', model: '500', price: 15774, electric: false },
        { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
      ]);
    
      // Column Definitions: Defines & controls grid columns.
      const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
        { field: 'make' },
        { field: 'model' },
        { field: 'price' },
        { field: 'electric' },
      ]);

    return (
        <div
          className={
            "ag-theme-quartz"
          }
          style={{ width: '80%', height: 400 }}
        >
          <AgGridReact rowData={[]} columnDefs={colDefs} />
          {rowData[0].make}
        </div>
      );
}

export default Transaction;