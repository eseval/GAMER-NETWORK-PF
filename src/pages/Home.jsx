import Footer from "../components/Footer";
import Slider from "../components/Slider";
import NewsContainer from "../components/NewsContainer";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import {useEffect} from "react"
import DetailForum from "../components/DetailForum";
import AnswerForum from "../components/AnswerForum";
import ForumContainer from "../components/ForumContainer";
import Forum from "./Forum";


export default function Home() {
  let navigate = useNavigate();

  const dataUser = !window.localStorage.userLogged ? "" : JSON.parse(window.localStorage.userLogged);

  useEffect(()=>{
    if(!dataUser || dataUser===""){
      navigate("/")
    }
  },[dataUser])

   return (
      <div>
        {<NavBar/>}
        <Forum/>
        {/*<Slider />*/}
        {/*<NewsContainer />*/}
        {/*<Footer />*/}
      </div>
    )

}