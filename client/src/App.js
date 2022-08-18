import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NewsContainer from './pages/NewsContainer';


function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/news' element={<NewsContainer />} />
      <Route path='/news/:id' element={<Profile />} />
    </Routes>
  );
}

export default App;
