import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';


function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='profile' element={<Profile />} />
    </Routes>
  );
}

export default App;
