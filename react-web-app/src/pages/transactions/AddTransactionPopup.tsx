import { Modal } from 'antd';
import { useState } from 'react';
import Account from '../../types/Account';

interface IAddTransactionPopupProps {
  isOpen: boolean;
  setIsOpen: (x: boolean) => void;
}

function AddTransactionPopup({ isOpen, setIsOpen }: IAddTransactionPopupProps) {

  const handleOk = () => {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isOpen}
        onOk={handleOk}
        onCancel={() => {setIsOpen(false);}}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export default AddTransactionPopup;