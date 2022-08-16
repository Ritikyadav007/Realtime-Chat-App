/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { Avatar } from 'antd';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import { IconButton } from '@mui/material/';
import './Sidebar.css';
import { PoweroffOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { doc, updateDoc } from '@firebase/firestore';
import EditProfile from '../EditProfile/EditProfile';
import storage, { uploadImage } from '../../Services/StorageService';
import { useAuth } from '../../store/AuthContext';
import db from '../../Services/UserService';

export default function Sidebar() {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [userImage, setuserImage] = useState('');
  const { LogOut, user } = useAuth();

  const Icons = [ChatOutlinedIcon, PoweroffOutlined, Brightness2OutlinedIcon];

  const handleCancel = () => {
    setisModalVisible(false);
  };

  const handleUserChanges = async (
    name: string,
    phone: string,
    newImage: File,
  ) => {
    setisModalVisible(false);
    uploadImage(newImage, user.uid);
    const updateRef = doc(db, 'users', user.uid);
    await updateDoc(updateRef, {
      name,
    });
  };

  const handleLogOut = async () => {
    try {
      await LogOut();
    } catch {
      console.log('error');
    }
  };

  useEffect(() => {
    const imageRef = ref(storage, `assets/${user.uid}/profileimage.jpg`);
    getDownloadURL(imageRef).then((url) => {
      setuserImage(url);
    });
  }, [user.uid]);

  const renderEditModal = () => {
    return (
      <EditProfile
        isVisible={isModalVisible}
        onCancel={handleCancel}
        onSave={handleUserChanges}
      />
    );
  };

  const renderSiderBarIcons = () => {
    return Icons.map((Icon: any) => {
      if (Icon === PoweroffOutlined) {
        return (
          <IconButton>
            <Icon onClick={handleLogOut} />
          </IconButton>
        );
      }
      return (
        <IconButton>
          <Icon />
        </IconButton>
      );
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar_items">
        <div className="sidebar_avatar">
          <Avatar size={40} src={userImage} />
        </div>
        <IconButton>
          <AccountCircleOutlinedIcon
            onClick={() => {
              setisModalVisible(true);
            }}
          />
          {renderEditModal()}
        </IconButton>
        {renderSiderBarIcons()}
      </div>
    </div>
  );
}
