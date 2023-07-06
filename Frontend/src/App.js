import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignupPage from './pages/SignupPage';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import UserLogin from './pages/UserLogin';
import AdminHome from './pages/AdminHome';
import ProfilePage from './pages/ProfilePage';
import ProtectedPage from './components/protectedPage';
import AdminProtectedPage from './components/protectAdmin';




function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ProtectedPage> <Home/> </ProtectedPage>} />
        <Route path='/profile' element={<ProtectedPage> <ProfilePage/> </ProtectedPage>} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<UserLogin />} />

        
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/adminHome' element={<AdminProtectedPage> <AdminHome/> </AdminProtectedPage>}/>
      </Routes>
    </div>
  );
}

export default App;
