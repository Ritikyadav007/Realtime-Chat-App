import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { IconButton } from '@mui/material/';
import './SendMessage.css';
import { useEffect, useState } from 'react';

type SendMessageProps = {
  handleMessage: Function;
};

export default function SendMessage(props: SendMessageProps) {
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);
  const { handleMessage } = props;

  useEffect(() => {
    const rowlen = message.split('\n');

    if (rowlen.length < 10) {
      setRows(rowlen.length);
    } else {
      setRows(10);
    }
  }, [message]);

  return (
    <>
      <div className="chat_footerInput">
        <textarea
          value={message}
          rows={rows}
          placeholder="Type a Message"
          onChange={(e) => {
            e.preventDefault();
            setMessage(e.target.value);
          }}
        />
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
      </div>
      <div className="chat_footerButton">
        <button
          type="submit"
          onClick={() => {
            handleMessage(message);
            setMessage('');
          }}
        >
          <SendIcon />
        </button>
      </div>
    </>
  );
}
