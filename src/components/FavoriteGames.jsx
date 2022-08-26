import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getGames} from "../redux/actions/index"


export default function FavoriteGames(){
const dataUser = !window.localStorage.userLogged ? "" : JSON.parse(window.localStorage.userLogged);
const dispatch = useDispatch()

const allGames = useSelector(state => state.games);

useEffect(()=>{
    dispatch(getGames())
},[dispatch])

let favoriteGames=dataUser.favoriteGames.map(g =>allGames.filter(e=>(e.id===g)))
favoriteGames=favoriteGames.flat(Infinity)


return(
    <div className="container flex flex-row flex-wrap">
      {favoriteGames.length>0 ? favoriteGames.map(e=>{
        console.log(e)
        return(
          <div key={e.name} className="w-24 m-2 overflow-hidden text-center text-white align-middle bg-gray-800 border border-gray-700 rounded-md shadow-lg">
          <img src={e.img} width="100px" alt={e.name}/>
          <p>{e.name}</p>
          </div>
        )
      }):"No games found"}
    </div>
)

}