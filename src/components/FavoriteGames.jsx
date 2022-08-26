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
    <div>
       {favoriteGames.length>0 ? favoriteGames.map(e=>{
        console.log(e)
        return(
            <div key={e.name}>
                {e.name}
               <img src={e.img} width="100px"/>
            </div>
        )
       }):"No games found"}
    </div>
)

}