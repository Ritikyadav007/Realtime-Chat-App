import { doc, getDoc } from '@firebase/firestore';
import { Avatar, Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import db from '../../Services/UserService';
import { useAuth } from '../../store/AuthContext';
import AppModal from '../AppModal';
import ChooseProfile from '../ChooseProfile/ChooseProfile';
import './EditProfile.css';

type EditProfileProps = {
  isVisible: boolean;
  onCancel: Function;
  onSave: Function;
};

export default function EditProfile(props: EditProfileProps) {
  const { isVisible, onCancel, onSave } = props;
  const { user } = useAuth();
  const [name, setName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [currentUserData, setcurrentUserData] = useState<any>();
  const [newImage, setnewImage] = useState<File>();

  useEffect(() => {
    const userRef = doc(db, 'users', user.uid);
    const data = getDoc(userRef).then((userData) => {
      return userData;
    });
    data.then((userInfo) => {
      setcurrentUserData(userInfo.data());
    });
  }, []);

  const handleNewImage = (data: FileList) => {
    setnewImage(data[0]);
  };

  return (
    <AppModal
      title="Edit User Profile"
      isModalVisible={isVisible}
      handleCancel={onCancel}
    >
      <div className="modal_items">
        <Avatar size={50} src={newImage && URL.createObjectURL(newImage)} />
        <ChooseProfile handleImage={handleNewImage} />
        <div className="modal_form">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              initialValue={currentUserData && currentUserData.name}
            >
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Phone" name="phone" initialValue="1223">
              <Input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button
                id="button"
                type="primary"
                htmlType="submit"
                onClick={() => onSave(name, phone, newImage)}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </AppModal>
  );
}
