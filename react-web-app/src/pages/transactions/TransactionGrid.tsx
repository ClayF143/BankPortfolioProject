import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import Transaction from '../../types/Transaction';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface TransactionGripProps {
  transactions: Transaction[];
}

function TransactionGrid({ transactions }: TransactionGripProps) {
  const [columnDefs] = useState<ColDef[]>([
    { headerName: "Amount", field: "amount" },
    { headerName: "Counterparty", field: "counterpartyName" },
    { headerName: "Date", field: "transactionDate" },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: columnDefs.length * 200 }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={transactions}
      />
    </div>
  )
}

export default TransactionGrid;