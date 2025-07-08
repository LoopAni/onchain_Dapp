import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import FeedPage from './pages/FeedPage';




function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
       <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
           <Route path="/profile" element={<ProfilePage />} />
           <Route path="/edit-profile" element={<EditProfilePage />} />
           <Route path="/feed" element={<FeedPage />} />
           
         
    </Routes>
  );
}

export default App;

