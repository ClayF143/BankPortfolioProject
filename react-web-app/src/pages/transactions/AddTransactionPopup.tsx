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

  const handleOk = () => {
    setIsOpen(false);
  }

  const addTransaction = async (transaction: Transaction) => {
    await new TransactionService().add(accessToken, transaction);
  }

  const onFinish: FormProps<TransactionViewModel>["onFinish"] = (values: TransactionViewModel) => {
    try {
      const transaction: Transaction = {
        id: 0,
        accountId: accountId,
        amount: 0,
        transactionDate: new Date(),
        counterpartyName: '',
        counterpartyAccountId: null
      }
      console.log('transaction: ');
      console.log(transaction);
      addTransaction(transaction);
      
    }
    catch(e) {
      console.log('Failed Transaction save: ', e);
    }
    finally {
      console.log('Success Transaction Simulation:', values);
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
            name="id"
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