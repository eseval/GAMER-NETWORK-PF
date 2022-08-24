import { useEffect } from 'react';
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import NewsContainer from "../components/NewsContainer";
import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserByEmail } from '../redux/actions';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const userDb = useSelector(state => state.user);

  useEffect(() => {
    if(user){dispatch(getUserByEmail(user.email))}
  }, [dispatch, user])

  console.log(user)

  if(isAuthenticated) {
    return (
      <div>
        {<NavBar user={userDb[0]} />}
        <Slider />
        <NewsContainer />
        <Footer />
      </div>
    )
  } else {
    navigate('/');
  }
}