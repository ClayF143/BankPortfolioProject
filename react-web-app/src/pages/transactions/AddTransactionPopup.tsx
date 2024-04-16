import { AutoComplete, Button, DatePicker, Form, FormProps, Input, InputNumber, Modal } from 'antd';
import { useEffect, useState } from 'react';
import Transaction from '../../types/Transaction';
import dayjs from 'dayjs';
import TransactionService from '../../services/TransactionService';
import { useAuth } from '../../MyAuthProvider';
import AccountService from '../../services/AccountService';

interface IAddTransactionPopupProps {
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
  accountId: number;
}

type AccountNumberOption = {
  accountId: number,
  accountNumber: string,
}

type TransactionViewModel = {
  id: number,
  accountNumber: number,
  amount: number,
  transactionDate: Date,
  counterpartyName: string,
  counterpartyAccountNumber: number | null
}

function AddTransactionPopup({ isOpen, setIsOpen, accountId }: IAddTransactionPopupProps) {
  const { accessToken } = useAuth();

  const [accountNumberOptions, setAccountNumberOptions] = useState<AccountNumberOption[]>([]);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState<AccountNumberOption | null>(null);

  const getAccountNumberOptions = async () => {
    const data = await new AccountService().fetchAll(accessToken);
    const options: AccountNumberOption[] = data.map(d => ({
      accountId: d.AccountNumber,
      accountNumber: ""
     }));
    setAccountNumberOptions(options);
  }
  useEffect(() => {
    getAccountNumberOptions();
  }, [])

  const handleOk = () => {
    setIsOpen(false);
  }

  const addTransaction = async (transaction: Transaction) => {
    await new TransactionService().add(accessToken, transaction);
  }

  const onFinish: FormProps<TransactionViewModel>["onFinish"] = (values: TransactionViewModel) => {
    try {
      const transaction: Transaction = {
        id: null,
        accountId: accountId,
        amount: 0,
        transactionDate: new Date(),
        counterpartyName: '',
        counterpartyAccountId: null
      }
      addTransaction(transaction);
      console.log('Success Transaction Simulation:', values);
    }
    catch(e) {
      console.log('Failed Transaction save: ', e);
    }
  };
  
  const onFinishFailed: FormProps<TransactionViewModel>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="Simulate Transaction"
        open={isOpen}
        onCancel={() => {setIsOpen(false);}}
        footer={[ ]}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ 
            accountId: accountId,
            transactionDate: dayjs()
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ maxWidth: "90%" }}
        >
          <Form.Item<Transaction>
            name="accountId"
          >
            <input type="hidden" />
          </Form.Item>
          <Form.Item<Transaction>
            label="Amount"
            name="amount"
          >
            <InputNumber />
          </Form.Item>
          <Form.Item<Transaction>
            label="Transaction Date"
            name="transactionDate"
          >
            <DatePicker style={{width: "100%"}}/>
          </Form.Item>
          <Form.Item>
            <AutoComplete 
              options={accountNumberOptions}
            />
          </Form.Item>
          <Form.Item<Transaction>
            label="counterpartyName"
            name="counterpartyName"
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddTransactionPopup;