import ContainerForum from "../components/ContainerForum";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react"


export default function Forum(){
    const navigate= useNavigate()
    const dataUser = !window.localStorage.userLogged ? "" : JSON.parse(window.localStorage.userLogged);
    useEffect(()=>{
      if(!dataUser || dataUser===""){
        navigate("/")
      }
    },[dataUser])
  
        return (
            <div>
                <Link to="/home"><button>Back to home</button></Link>
                <br/>
                <br/>
                <Link to="/post"><button>New Post</button></Link>
                <br/>
                <br/>
                <ContainerForum/>
               
            </div>
        )
 
}