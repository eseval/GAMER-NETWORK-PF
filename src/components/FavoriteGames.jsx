import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, cleanGamesState } from '../redux/actions/index';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function FavoriteGames({ user }) {
	const [dataUser, setDataUser] = useState(
		!window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged)
	);
	const dispatch = useDispatch();
	const allGames = useSelector(state => state.games);
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		dispatch(getGames());
		return () => {
			dispatch(cleanGamesState());
		};
	}, [dispatch]);

	let favoriteGames = [];
	if (dataUser.id !== user.id) {
		favoriteGames = user.favoriteGames.map(g => allGames.filter(e => e.id === g));
	} else {
		favoriteGames = dataUser.favoriteGames.map(g => allGames.filter(e => e.id === g));
	}

	favoriteGames = favoriteGames.flat(Infinity);

	const paginatedGames = () => {
		return favoriteGames.slice(currentPage, currentPage + 1);
	};

	const nextPage = () => {
		if (favoriteGames.length > currentPage + 1) {
			setCurrentPage(currentPage + 1);
		}
	};
	const prevPage = () => {
		if (currentPage > 0) setCurrentPage(currentPage - 1);
	};

	async function removeFavorite(id) {
		await axios.put(`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`, {
			delete: true,
			favorite: id,
		});
		let newDataUser = await axios.get(`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`);
		window.localStorage.setItem('userLogged', JSON.stringify(newDataUser.data));
		setDataUser(JSON.parse(window.localStorage.userLogged));
	}

	function handleClick(event, id) {
		event.preventDefault();
		removeFavorite(id);
	}

	if (favoriteGames.length > 0) {
		return (
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
						return (
							<div
								key={e.name}
								className="w-24 m-2 overflow-hidden text-center text-white align-middle bg-gray-800 border border-gray-700 rounded-md shadow-lg h-fit"
							>
								<Link to={`/games/${e.id}`}>
									<img src={e.img} className="w-full" alt={e.name} />
								</Link>
								{/* <p>{e.name}</p> */}
								{dataUser.id === user.id ? (
									<button
										className="px-2 py-1 mx-auto mb-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-800"
										onClick={event => handleClick(event, e.id)}
									>
										Remove
									</button>
								) : (
									''
								)}
							</div>
						);
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
		);
	} else {
		return <div>No games found</div>;
	}
}
