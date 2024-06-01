import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import AddTransactionPopup from "./AddTransactionPopup";
import { Button } from "antd";
import Account from "../../types/Account";
import { useAuth } from "../../MyAuthProvider";
import AccountService from "../../services/AccountService";
import Transaction from "../../types/Transaction";
import TransactionService from "../../services/TransactionService";
import TransactionGrid from "./TransactionGrid";

function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currAccount, setCurrAccount] = useState<Account | null>(null);
  const [accountOptions, setAccountOptions] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const { accessToken, isAuthenticated, myUser} = useAuth();

  const getAccountData = async () => {
    const data = await new AccountService().fetchAll(accessToken);
    setAccountOptions(data);
    if(data.length == 1) {
      setCurrAccount(data[0]);
    }
  }

  const getTransactionData = async () => {
    if(currAccount?.id) {
      const data = await new TransactionService().fetchAccountTransactions(accessToken, currAccount.id);
      setTransactions(data);
    }
  }

  useEffect(() => {
    if(isAuthenticated) {
      getAccountData();
    } else {
      setCurrAccount(null);
      setAccountOptions([]);
    }
  }, [accessToken]);

  useEffect(() => {
    if(currAccount != null)
      getTransactionData();
    else
      setTransactions([]);
  }, [currAccount])

  return (
      <div>
        {currAccount && (
          <>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Simulate Transaction
            </Button>
            <AddTransactionPopup isOpen={isModalOpen} setIsOpen={setIsModalOpen} accountId={currAccount?.id ?? 0} getTransactions={getTransactionData} />

            <TransactionGrid transactions={transactions} />
          </>
        )}
      </div>
    );
}

export default Transactions;