import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import SetupProfile from "./pages/SetupProfile";






function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
       <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
           <Route path="/feed" element={<FeedPage />} />
            <Route path="/profile-setup" element={<SetupProfile />} />

           
         
    </Routes>
  );
}

export default App;

