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

interface TransactionProps {
  user: User | null;
  refreshUser: () => void;
};

function Transactions({ user, refreshUser }: TransactionProps) {
  const { accessToken, isAuthenticated, authUser} = useAuth();

  const [currAccount, setCurrAccount] = useState<Account | undefined>(user ? user.accounts[0] : undefined);
  const [accountOptions, setAccountOptions] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  useEffect(() => {
    console.log('user in transaction', user);
    if(user) {
      setAccountOptions(user.accounts);
      if(user.accounts.length == 1) {
        setCurrAccount(user.accounts[0]);
      }
    } else {
      setCurrAccount(undefined);
      setAccountOptions([]);
    }
  }, [user]);
  
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
              <AddTransactionPopup isOpen={isModalOpen} setIsOpen={setIsModalOpen} account={currAccount} refreshAccount={refreshUser} />
            </div>
          </>
        )}
      </div>
    );
}

export default Transactions;