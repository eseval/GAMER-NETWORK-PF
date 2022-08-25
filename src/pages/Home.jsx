import Footer from "../components/Footer";
import Slider from "../components/Slider";
import NewsContainer from "../components/NewsContainer";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";


export default function Home() {
  let navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  if(isAuthenticated) {
    return (
      <div>
        <NavBar />
        <Slider />
        <NewsContainer />
        <Footer />
      </div>
    )
  } else {
    navigate('/');
  }
}