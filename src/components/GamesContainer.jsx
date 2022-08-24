import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../redux/actions';
import GamesCard from './GamesCard';

export default function GamesContainer() {
  const dispatch = useDispatch();
  const allGames = useSelector(state => state.games);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  const handleChange = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  }

  const games = allGames.filter(game => game.name.toLowerCase().includes(search.toLowerCase()));
  const paginatedGames = () => {
    return games.slice(currentPage, currentPage + 20)
  }

  const nextPage = () => {
    if(games.length > currentPage + 20) {
      setCurrentPage(currentPage + 20);
    }
  }

  const prevPage = () => {
    if(currentPage > 0) setCurrentPage(currentPage - 20);
  }

  let gamesToShow = paginatedGames();


  return(
    <div className="container">
      <h1 className="m-5 text-5xl font-semibold text-center text-white">News</h1>
      <div className="container flex">
        <input type="text" placeholder="Search a game..." onChange={handleChange} value={search} />
      </div>
      <div className="container flex flex-wrap justify-center">
        {allGames && gamesToShow.map(game => {
          return <GamesCard game={game} />
        })}
      </div>
      <div>
        <button onClick={prevPage}>Prev</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  )
}