import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';


function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='profile' element={<Profile />} />
    </Routes>
  );
}

export default App;
