import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import ProtectedRoute from '../Routes/ProtectedRoute'; 
import ForgetPassword from '../Screens/ForgetPasswordScreen/ForgetPassword';
import Home from '../Screens/HomeScreen/Home';
import Login from '../Screens/LoginScreen/Login';
import SignUp from '../Screens/SignUpScreen/SignUp';

export default function ScreensNavigator() {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}
