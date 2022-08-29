import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, cleanGamesState } from "../redux/actions/index"
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import axios from "axios";

export default function FavoriteGames(){
  const [dataUser, setDataUser] = useState(!window.localStorage.userLogged ? "" : JSON.parse(window.localStorage.userLogged))
  const dispatch = useDispatch()
  const allGames = useSelector(state => state.games);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(()=>{
    dispatch(getGames())
    return() =>{
      dispatch(cleanGamesState());
    }
  },[dispatch])

  let favoriteGames = dataUser.favoriteGames.map(g =>allGames.filter(e=>(e.id===g)))
  favoriteGames = favoriteGames.flat(Infinity)

  const paginatedGames = () => {
    return favoriteGames.slice(currentPage, currentPage + 6);
  };

  const nextPage = () => {
    if (favoriteGames.length > currentPage + 6) {
      setCurrentPage(currentPage + 6);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 6);
  };

  async function removeFavorite (id) {
  await axios.put(`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`, {
    delete: true,
    favorite: id
  });
  let newDataUser = await axios.get(`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`)
  window.localStorage.setItem("userLogged", JSON.stringify(newDataUser.data));
    setDataUser(JSON.parse(window.localStorage.userLogged));
    console.log(dataUser.favoriteGames)
  }

  function handleClick(event, id) {
    event.preventDefault();
    removeFavorite(id);
  }


  if(favoriteGames.length > 0) {
    return(
    <div className="container flex flex-row items-center mt-5">
      <div className="ml-1">
        <button
          className="text-gray-800 transition duration-500 ease-in-out hover:text-white"
          onClick={prevPage}
        >
          <BsFillArrowLeftCircleFill size="30px" />
        </button>
      </div>
      <div className="container flex flex-row flex-wrap">
        {paginatedGames().map(e => {
          console.log(e)
          return(
            <div key={e.name} className="w-24 h-32 m-2 overflow-hidden text-center text-white align-middle bg-gray-800 border border-gray-700 rounded-md shadow-lg">
              <img src={e.img} width="100px" alt={e.name}/>
              <p>{e.name}</p>
              <button onClick={(event)=>handleClick(event, e.id)}>Remove</button>
            </div>
          )
        })}
      </div>
      <div className="mr-1">
        <button
          className="text-gray-800 transition duration-500 ease-in-out hover:text-white"
          onClick={nextPage}
        >
          <BsFillArrowRightCircleFill size="30px" />
        </button>
      </div>
    </div>
  )} else {
    return (
      <div>No games found</div>
    )
  }
}