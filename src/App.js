import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from './pages/Landing Page/Landing';
import User from './pages/User Page/User';
import Dept from './pages/Dept Page/Dept';
import Admin from './pages/Admin Page/Admin';
import Auth from './pages/Auth Page/Auth';
import Error404 from './components/Error404/Error404';
import AssignWrapper from './pages/Dept Page/AssignWrapper';
import Faculty from './pages/Faculty Page/Faculty';
import Forgot from './pages/Password/Forgot';
import Reset from './pages/Password/Reset';
import Chat from './pages/Chat Page/Chat';


function App() {
  const user = useSelector((state) => state.authReducer.authData)
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={user ? <ProtectedRoutes /> : <Auth />} />
        <Route path='/forgot-password' element={<Forgot />} />
        <Route path='/reset-password/:id/:token' element={<Reset />} />
        <Route path="/dashboard/user" element={user ? <User /> : <Navigate to="../auth" />} />
        <Route path="/dashboard/department" element={user ? <Dept /> : <Navigate to="../auth" />} />
        <Route path='/dashboard/faculty' element={user ? <Faculty /> : <Navigate to="../auth" />} />
        <Route path="/dashboard/admin" element={user ? <Admin /> : <Navigate to="../auth" />} />
        <Route path="/manage/assign" element={user ? <AssignWrapper /> : <Navigate to="../auth" />} />
        <Route path="/message" element={user ? <Chat /> : <Navigate to="*" />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  );
}

function ProtectedRoutes() {
  const { user } = useSelector((state) => state.authReducer.authData);

  switch (user.role) {
    case 'User':
      return <Navigate to="/dashboard/user" />;
    case 'Faculty':
      return <Navigate to="/dashboard/faculty" />;
    case 'Department':
      return <Navigate to="/dashboard/department" />;
    case 'Admin':
      return <Navigate to="/dashboard/admin" />;
    default:
      return <Navigate to="/" />;
  }
}

export default App;
