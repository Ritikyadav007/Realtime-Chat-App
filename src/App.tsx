import './App.css';
import AuthContextProvider from './store/AuthContext';
import ScreensNavigator from './Navigation/ScreensNavigator';
import UserContextProvider from './store/UserContext';

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <ScreensNavigator />
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
