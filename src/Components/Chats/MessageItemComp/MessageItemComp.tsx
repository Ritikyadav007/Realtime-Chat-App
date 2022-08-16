import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useAuth } from '../../../store/AuthContext';
import { useUser } from '../../../store/UserContext';
import './MessageItemComp.css';

export type Message = {
  fromUser: string;
  message: string;
  timestamp: number;
};

type MessageProps = {
  messageData: Message;
};

export default function MessageItemComp(props: MessageProps) {
  const { messageData } = props;
  const { message, fromUser, timestamp } = messageData;
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState<string>('');
  const { friendList, getUserImage } = useUser();

  useEffect(() => {
    const image = getUserImage(fromUser, friendList);
    setImageUrl(image);
  }, [fromUser, friendList, getUserImage]);

  const messageTimeStamp = new Date(timestamp);

  const timeStampString = `${messageTimeStamp.getHours()}:${messageTimeStamp
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  const messageCompClass = `chat_messageComp ${
    fromUser === user.uid && 'chat_recieverComp'
  }`;
  const messageClass = `chat_message ${
    fromUser === user.uid && 'chat_reciever'
  }`;
  return (
    <div className={messageCompClass}>
      <Avatar src={<LazyLoadImage src={imageUrl} />} />
      <div className={messageClass}>
        {message.trim()}
        <span className="time">{timeStampString}</span>
      </div>
    </div>
  );
}
