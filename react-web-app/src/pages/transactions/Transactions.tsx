import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import AddTransactionPopup from "./AddTransactionPopup";
import { Menu, Dropdown, Button, MenuProps } from 'antd';
import Account from "../../types/Account";
import { useAuth } from "../../MyAuthProvider";
import TransactionGrid from "./TransactionGrid";
import TransactionLineGraph from "../TransactionLineGraph";
import { DownOutlined, UserOutlined } from '@ant-design/icons';

function Transactions() {
  const { myUser, refreshAuthVals} = useAuth();
  const [currAccount, setCurrAccount] = useState<Account | undefined>(myUser ? myUser.accounts[0] : undefined);
  const [accountOptions, setAccountOptions] = useState<Account[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
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

  const items: MenuProps['items'] = myUser?.accounts.map(account => {
    return {
      label: account.name,
      key: account.id,
      icon: <UserOutlined />,
    }
  });

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setCurrAccount(accountOptions.find(account => account.id == Number(e.key)));
  }
  
  return (
    <div style={{ width: '95%' }}>
      <div className='row mb-4'>
        <TransactionLineGraph />
      </div>
      {currAccount && (
        <>
          <div className="row mb-2">
            <div className="col-md-1">
              <Dropdown menu={{ items, onClick: handleMenuClick}}>
                <Button>
                  {currAccount.name} <DownOutlined />
                </Button>
              </Dropdown>
            </div>
            <div className="col-md-1">
              <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Simulate Transaction
              </Button>  
            </div>
          </div>
          <div className="row">
            <TransactionGrid transactions={currAccount.transactions} />
            <AddTransactionPopup isOpen={isModalOpen} setIsOpen={setIsModalOpen} account={currAccount} refreshAccount={refreshAuthVals} />
          </div>
        </>
      )}
    </div>
  );
}

export default Transactions;