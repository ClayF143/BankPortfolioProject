import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import AddTransactionPopup from "./AddTransactionPopup";
import { Button } from "antd";
import Account from "../../types/Account";
import { useAuth } from "../../MyAuthProvider";
import AccountService from "../../services/AccountService";
import TransactionGrid from "./TransactionGrid";

function Transactions() {
  const { accessToken, isAuthenticated, myUser} = useAuth();

  const [currAccount, setCurrAccount] = useState<Account | null>(null);
  const [accountOptions, setAccountOptions] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const getAccountData = async () => {
    const data = await new AccountService().fetchAll(accessToken);
    setAccountOptions(data);
    if(data.length == 1) {
      const account = await new AccountService().fetch(accessToken, data[0].id);
      setCurrAccount(account);
    }
  }

  const refreshAccount = async () => {
    if(currAccount == null)
      await getAccountData();
    else {
      const newAccount = await new AccountService().fetch(accessToken, currAccount.id);
      setCurrAccount(newAccount);
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

  return (
      <div>
        {currAccount && (
          <>
            <div className="row">
              <div className="col">
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                  Simulate Transaction
                </Button>  
              </div>
              <div className="col">
                select account dropdown wip, not going to add until there's a way to add accounts
              </div>
            </div>
            <div className="row mt-2">
              <TransactionGrid transactions={currAccount.transactions} />
              <AddTransactionPopup isOpen={isModalOpen} setIsOpen={setIsModalOpen} account={currAccount} refreshAccount={refreshAccount} />
            </div>
          </>
        )}
      </div>
    );
}

export default Transactions;