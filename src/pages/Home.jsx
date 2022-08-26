import Footer from "../components/Footer";
import Slider from "../components/Slider";
import NewsContainer from "../components/NewsContainer";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import {useEffect} from "react"


export default function Home() {
  let navigate = useNavigate();

  const dataUser = window.localStorage.userLogged ? JSON.parse(window.localStorage.userLogged): "";

  useEffect(()=>{
    if(!dataUser || dataUser===""){
      navigate("/")
    }
  },[dataUser])

   return (
      <div>
        {<NavBar/>}
        <Slider />
        <NewsContainer />
        <Footer />
      </div>
    )

}