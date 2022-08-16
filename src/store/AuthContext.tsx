/* eslint-disable react/jsx-no-constructed-context-values */
import { onAuthStateChanged } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import auth, {
  LogIn,
  LogOut,
  ResetPassword,
  signUp,
} from '../Services/AuthService';

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<any | null>(null);

export default function AuthContextProvider(props: AuthContextProviderProps) {
  const { children } = props;
  const [user, setUser] = useState<any>();
  const [isPending, setisPending] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setisPending(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (isPending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{ user, LogIn, LogOut, ResetPassword, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
