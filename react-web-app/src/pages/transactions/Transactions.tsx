import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import UserList from "../../misc-components/UserList";
import AddTransactionPopup from "./AddTransactionPopup";
import { Button } from "antd";
import Account from "../../types/Account";
import { useAuth } from "../../MyAuthProvider";

function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currAccount, setCurrAccount] = useState<Account | null>(null);
  const [accountOptions, setAccountOptions] = useState<Account[]>([]);

  const { accessToken, isAuthenticated, myUser} = useAuth();

  useEffect(() => {
    if(isAuthenticated) {
      //get account options
      //set account options
      if(accountOptions.length == 1) {
        setCurrAccount(accountOptions[0]);
      }
    } else {
      setCurrAccount(null);
      setAccountOptions([]);
    }

  }, [isAuthenticated]);

  return (
      <div>
        <div>
          {accountOptions.length > 1 && (
            <>
            </>
          )}
        </div>

        <UserList />
        <div>
          ------------------
        </div>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Open Modal
        </Button>
        <AddTransactionPopup isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </div>
    );
}

export default Transactions;