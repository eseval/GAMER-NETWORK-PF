import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllPosts } from "../redux/actions";
import Loader from '../components/Loader';

export default function ContainerForum() {
  const dataUser = !window.localStorage.userLogged ? "" : JSON.parse(window.localStorage.userLogged);
  const dispatch = useDispatch()
  const themes = useSelector((state) => state.posts);
  useEffect(()=> {
    dispatch (getAllPosts())
  }, [dispatch]) 


  while(!themes){
    return(
      <div className='container text-center'>
        <h1 className='text-5xl font-semibold text-white'>Play Center</h1>
        <div className='mt-10'>
          <Loader width={8} />
        </div>
      </div>
    )
  }
  return (
    <div>
      {themes.length > 0 ? themes.map((e) => {
        return (
          <div key={e.id}>
            {e.deleteFlag===true
            ?""
            :<Link to={`/postDetails/${e.id}`}>
              <h3>{e.title}</h3>
            </Link>
            }
            { 
             e.deleteFlag===false && e.userId===dataUser.id
            ? <Link to={`/post/${e.id}`}>
                <div>edit</div>
            </Link>
            :""
            }  
          </div>
        );
      }): "" }
    </div>
  );
}