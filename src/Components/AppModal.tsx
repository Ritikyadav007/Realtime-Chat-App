import { Button, Modal } from 'antd';
import { ReactEventHandler, ReactNode } from 'react';
import 'antd/dist/antd.css';

type AppModalProps = {
  isModalVisible: boolean;
  handleCancel: Function;
  title: string;
  children: ReactNode;
};

export default function AppModal(props: AppModalProps) {
  const { isModalVisible, handleCancel, title, children } = props;

  return (
    <Modal
      title={title}
      visible={isModalVisible}
      footer={null}
      onCancel={() => {
        handleCancel();
      }}
    >
      {children}
    </Modal>
  );
}
