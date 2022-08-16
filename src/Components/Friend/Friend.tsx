import { Avatar } from 'antd';
import './Friend.css';
import { useEffect, useState } from 'react';
import { Message } from '../Chats/MessageItemComp/MessageItemComp';

type FriendsProps = {
  groupData: any;
  isSelected: boolean;
  handleClick: Function;
};

export default function Friend(props: FriendsProps) {
  const { groupData, handleClick, isSelected = false } = props;
  const { name } = groupData;
  const [lastMessage, setLastMessage] = useState<string>();
  const defaultImg = 'https://cdn-icons-png.flaticon.com/512/166/166258.png';

  const groupAvatar =
    groupData.imageUrl === undefined ? defaultImg : groupData.imageUrl;

  useEffect(() => {
    if (groupData.messages === undefined) {
      setLastMessage('...');
    } else {
      const { messages } = groupData;
      const msgArray: Message[] = Object.values(messages);
      const lastMsg: Message = msgArray[msgArray.length - 1];
      if (lastMsg.message.length > 10) {
        setLastMessage(`${lastMsg.message.slice(0, 9)}...`);
      } else {
        setLastMessage(lastMsg.message);
      }
    }
  }, [groupData]);

  return (
    <div
      className="friend"
      style={{ backgroundColor: isSelected ? 'rgb(233, 224, 224)' : '' }}
      onClick={() => {
        handleClick(groupData);
      }}
    >
      <Avatar size={40} src={groupAvatar} />
      <div className="friend_info">
        <h2>{name}</h2>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
}
