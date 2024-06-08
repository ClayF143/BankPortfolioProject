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
    { headerName: "Amount", field: "amount", flex: 1, filter: 'agNumberColumnFilter',
      cellRenderer: (param: any) => {
        const sign = param.value < 0 ? '-' : '+';
        return `${sign}$${Math.abs(param.value).toFixed(2)}`;
      },
      cellStyle: (param) => {return {color: param.value < 0 ? 'red' : 'green'}}
    },
    { headerName: "Counterparty", field: "counterpartyName", flex: 2, filter: 'agTextColumnFilter' },
    { headerName: "Balance History", field: "balanceSnapshot", flex: 1, filter: 'agNumberColumnFilter',
      cellRenderer: (param: any) => {
        const sign = param.value < 0 ? '-' : '';
        return `${sign}$${Math.abs(param.value).toFixed(2)}`
      }
    },
    { headerName: "Date", field: "transactionDate", flex: 1, filter: 'agDateColumnFilter',
      valueFormatter: (param) => new Date(param.value).toLocaleDateString('en-US')
    },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '95%', minWidth: 400 }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={transactions}
      />
    </div>
  )
}

export default TransactionGrid;