import axios from "axios";
import { useEffect, useState } from "react";

export default function GamesCard({ game }) {
  const [dataUser, setDataUser] = useState(JSON.parse(window.localStorage.userLogged));
  
  useEffect(() => {
    setDataUser(JSON.parse(window.localStorage.userLogged))
  }, [setDataUser])


  const addFavorite = async () => {
    await axios.put(`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`, {
      delete: false,
      favorite: game.id
    });
    const newDataUser = await axios.get(`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`)
    window.localStorage.setItem("userLogged", JSON.stringify(newDataUser.data));
    setDataUser(JSON.parse(window.localStorage.userLogged));
  }

  const removeFavorite = async () => {
    await axios.put(`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`, {
      delete: true,
      favorite: game.id
    });
    const newDataUser = await axios.get(`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`)
    window.localStorage.setItem("userLogged", JSON.stringify(newDataUser.data));
    setDataUser(JSON.parse(window.localStorage.userLogged));
  }

  return (
    <div className="flex flex-col justify-between w-64 h-64 m-2 overflow-hidden text-center align-middle bg-gray-800 border border-gray-700 rounded-md shadow-lg">
      <img className="object-cover w-full h-32 rounded-t-lg" src={game.img} alt={game.name}/>
      <p className="mb-2 text-lg font-semibold text-white">{game.name}</p>
      {dataUser.favoriteGames.includes(game.id) ? 
        <button className="px-2 py-1 mx-auto mb-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-800" onClick={removeFavorite}>Remove Favorite</button>
        :
        <button className="px-2 py-1 mx-auto mb-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-800" onClick={addFavorite}>Add Favorite</button>
      }
    </div>
  )
}