import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import UserList from "../../misc-components/UserList";
import AddTransactionPopup from "./AddTransactionPopup";
import { Button } from "antd";
import Account from "../../types/Account";
import { useAuth } from "../../MyAuthProvider";
import AccountService from "../../services/AccountService";
import Transaction from "../../types/Transaction";
import TransactionService from "../../services/TransactionService";

function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currAccount, setCurrAccount] = useState<Account | null>(null);
  const [accountOptions, setAccountOptions] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const { accessToken, isAuthenticated, myUser} = useAuth();

  const getAccountData = async () => {
    console.log('start');
    const data = await new AccountService().fetchAll(accessToken);
    setAccountOptions(data);
    if(data.length == 1) {
      console.log('boo');
      setCurrAccount(data[0]);
    }
    console.log(currAccount?.AccountNumber);
  }

  const getTransactionData = async () => {
    if(currAccount?.AccountNumber) {
      const data = await new TransactionService().fetchAccountTransactions(accessToken, currAccount.AccountNumber);
      setTransactions(data);
    }
  }

  useEffect(() => {
    if(isAuthenticated) {
      getAccountData();
    }
  }, [])

  useEffect(() => {
    if(isAuthenticated) {
      getAccountData();
    } else {
      setCurrAccount(null);
      setAccountOptions([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if(currAccount != null)
      getTransactionData();
    else
      setTransactions([]);
  }, [currAccount])

  return (
      <div>
        {currAccount && (
          <div> account exists </div>
        )}
        {!currAccount && (
          <div> account does not exists </div>
        )}
        <div>
          {accountOptions.length > 1 && (
            <>
            </>
          )}
        </div>

        <UserList />
        {currAccount && (
          <>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
            <AddTransactionPopup isOpen={isModalOpen} setIsOpen={setIsModalOpen} accountId={currAccount?.AccountNumber ?? 0} />
          </>
        )}
      </div>
    );
}

export default Transactions;