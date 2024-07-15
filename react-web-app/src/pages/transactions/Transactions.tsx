import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import AddTransactionPopup from "./AddTransactionPopup";
import { Button } from "antd";
import Account from "../../types/Account";
import { useAuth } from "../../MyAuthProvider";
import AccountService from "../../services/AccountService";
import TransactionGrid from "./TransactionGrid";
import User from "../../types/User";

function Transactions() {
  const { myUser, refreshAuthVals} = useAuth();

  const [currAccount, setCurrAccount] = useState<Account | undefined>(myUser ? myUser.accounts[0] : undefined);
  const [accountOptions, setAccountOptions] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  useEffect(() => {
    console.log('user in transaction', myUser);
    if(myUser) {
      setAccountOptions(myUser.accounts);
      if(myUser.accounts.length == 1) {
        setCurrAccount(myUser.accounts[0]);
      }
    } else {
      setCurrAccount(undefined);
      setAccountOptions([]);
    }
  }, [myUser]);
  
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
              <AddTransactionPopup isOpen={isModalOpen} setIsOpen={setIsModalOpen} account={currAccount} refreshAccount={refreshAuthVals} />
            </div>
          </>
        )}
      </div>
    );
}

export default Transactions;