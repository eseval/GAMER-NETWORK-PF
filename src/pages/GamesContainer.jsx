import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../redux/actions";
import GamesCard from "../components/GamesCard";
import NavBar from "../components/NavBar";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

export default function GamesContainer() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.games);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  const handleChange = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  };

  const games = allGames.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );
  const paginatedGames = () => {
    return games.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (games.length > currentPage + 10) {
      setCurrentPage(currentPage + 10);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 10);
  };

  let gamesToShow = paginatedGames();

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1 className="m-5 text-5xl font-semibold text-center text-white">
          Games
        </h1>
        <div className="container flex flex-col">
          <div className="mx-24 max-w-md">
            <form>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="default-search"
                  className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for a game..."
                  required=""
                  onChange={handleChange}
                  value={search}
                />
              </div>
            </form>
          </div>
          <div className="container flex flex-row items-center mt-5">
            <div className="ml-3">
              <button
                className="text-gray-800 hover:text-white transition duration-500 ease-in-out"
                onClick={prevPage}
              >
                <BsFillArrowLeftCircleFill size="40px" />
              </button>
            </div>
            <div className="container flex flex-wrap justify-center">
              {allGames &&
                gamesToShow.map((game) => {
                  return <GamesCard game={game} />;
                })}
            </div>
            <div className="mr-3">
              <button
                className="text-gray-800 hover:text-white transition duration-500 ease-in-out"
                onClick={nextPage}
              >
                <BsFillArrowRightCircleFill size="40px" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
