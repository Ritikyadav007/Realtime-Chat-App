/* eslint-disable react/no-unstable-nested-components */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ReactNotificationProps = {
  title: string;
  body: string;
};

export default function ReactNotification(props: ReactNotificationProps) {
  const { title, body } = props;
  function Display() {
    return (
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    );
  }
  toast.info(<Display />);

  return <ToastContainer />;
}
