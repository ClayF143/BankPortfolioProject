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
    { headerName: "Amount", field: "amount", flex: 1, filter: 'agNumberColumnFilter' },
    { headerName: "Counterparty", field: "counterpartyName", flex: 2, filter: 'agTextColumnFilter' },
    { headerName: "Date", field: "transactionDate", flex: 1, filter: 'agDateColumnFilter',
      valueFormatter: (param) => new Date(param.value).toLocaleDateString('en-US')
    },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '80%', minWidth: 400 }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={transactions}
      />
    </div>
  )
}

export default TransactionGrid;