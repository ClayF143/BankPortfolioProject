import { Button, DatePicker, Form, FormProps, Input, InputNumber, Modal } from 'antd';
import { useState } from 'react';
import Account from '../../types/Account';
import Transaction from '../../types/Transaction';
import dayjs from 'dayjs';
import TransactionService from '../../services/TransactionService';
import { useAuth } from '../../MyAuthProvider';

interface IAddTransactionPopupProps {
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
  accountId: number;
}

function AddTransactionPopup({ isOpen, setIsOpen, accountId }: IAddTransactionPopupProps) {
  const { accessToken } = useAuth();

  const handleOk = () => {
    setIsOpen(false);
  }

  const addTransaction = async (transaction: Transaction) => {
    const res = await new TransactionService().add(accessToken, transaction);
  }

  const onFinish: FormProps<Transaction>["onFinish"] = (values: Transaction) => {
    console.log('Success:', values);
    addTransaction(values);
  };
  
  const onFinishFailed: FormProps<Transaction>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="Simulate Transaction"
        open={isOpen}
        onOk={handleOk}
        
        onCancel={() => {setIsOpen(false);}}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ 
            accountId: accountId,
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