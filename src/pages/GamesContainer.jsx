import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../redux/actions';
import GamesCard from '../components/GamesCard';
import NavBar from '../components/NavBar';

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
    return games.slice(currentPage, currentPage + 10)
  }

  const nextPage = () => {
    if(games.length > currentPage + 10) {
      setCurrentPage(currentPage + 10);
    }
  }

  const prevPage = () => {
    if(currentPage > 0) setCurrentPage(currentPage - 10);
  }

  let gamesToShow = paginatedGames();


  return(
    <div>
      <NavBar />
      <div className="container">
        <h1 className="m-5 text-5xl font-semibold text-center text-white">Games</h1>
        <div className="container flex flex-col">
          <div>
            <input type="text" placeholder="Search a game..." onChange={handleChange} value={search} />
          </div>
          <div className="container flex flex-row items-center mt-5">
            <div>
              <button className="px-4 py-2 text-sm text-indigo-600 bg-white border rounded-lg hover:bg-indigo-800 hover:text-white"  onClick={prevPage}>Prev</button>
            </div>
            <div className="container flex flex-wrap justify-center">
              {allGames && gamesToShow.map(game => {
                return <GamesCard game={game} />
              })}
            </div>
            <div>
              <button className="px-4 py-2 text-sm text-indigo-600 bg-white border rounded-lg hover:bg-indigo-800 hover:text-white"  onClick={nextPage}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}