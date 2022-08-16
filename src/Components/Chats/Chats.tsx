import './Chats.css';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import MessageItemComp, { Message } from './MessageItemComp/MessageItemComp';
import SendMessage from './SendMessage/SendMessage';
import { uploadMessages } from '../../Services/DatabaseService';
import ChatHeader from './ChatHeader/ChatHeader';
import { useAppSelector, useAppDispatch } from '../../store/redux/hooks';
import { fetchMessages } from '../../store/redux/reducers/MessageSlice';

type ChatsProps = {
  selectedGroupData: any | undefined;
  handleBackButton: Function;
  selectedGroupMsg: any;
};

export default function Chats(props: ChatsProps) {
  const { selectedGroupData, handleBackButton, selectedGroupMsg } = props;
  const { name, imageUrl, groupId } = selectedGroupData;

  //  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setisLoaded] = useState(false);
  const { user } = useAuth();
  const messages = selectedGroupMsg;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMessages(groupId));
    setisLoaded(false);
  }, [isLoaded]);

  const handleSentMessage = (msg: string) => {
    uploadMessages(user.uid, msg, groupId);
    setisLoaded(true);
  };

  const renderMessages = () => {
    return messages.map((data: Message) => {
      return <MessageItemComp messageData={data} />;
    });
  };

  return (
    <div className="chats">
      <div className="header">
        <ChatHeader
          chatName={name}
          chatImage={imageUrl}
          handleClick={handleBackButton}
        />
      </div>
      <div className="chat_body">{renderMessages()}</div>
      <div className="chat_footer">
        <SendMessage handleMessage={handleSentMessage} />
      </div>
    </div>
  );
}
