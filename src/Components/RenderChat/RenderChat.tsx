import { Avatar } from 'antd';
import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import storage from '../../Services/StorageService';
import { useAuth } from '../../store/AuthContext';
import './RenderChat.css';

export default function RenderChat() {
  const [userImage, setuserImage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const imageRef = ref(storage, `assets/${user.uid}/profileimage.jpg`);
    getDownloadURL(imageRef).then((url) => {
      setuserImage(url);
    });
  }, []);

  return (
    <div className="chats">
      <div className="chats_Items">
        <Avatar size={80} src={userImage} />
        <h5>Welcome</h5>
        <p>Please select a chat to start messaging</p>
      </div>
    </div>
  );
}
