import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/actions';
import UserCard from '../components/UserCards';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function PlayContainer() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const allUsers = useSelector(state => state.users);
	const [currentPage, setCurrentPage] = useState(0);
	// const [search, setSearch] = useState('');

	useEffect(() => {
		dispatch(getUsers());
		// return () => {
		// 	dispatch(cleanGamesState());
		// };
	}, [dispatch]);

	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);

	useEffect(() => {
		if (!dataUser || dataUser === '') {
			navigate('/');
		}
	}, [dataUser, navigate]);

	// const handleChange = e => {
	// 	setCurrentPage(0);
	// 	setSearch(e.target.value);
	// };

	const users = allUsers.filter(user => user.nickname.toLowerCase());
	const paginatedUsers = () => {
		return users.slice(currentPage, currentPage + 1);
	};

	const nextPage = () => {
		if (users.length > currentPage + 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) setCurrentPage(currentPage - 1);
	};

	let usersToShow = paginatedUsers();

	return (
		<div>
			<NavBar />
			<div className="container">
				<h1 className="m-5 text-5xl font-semibold text-center text-white">Play!</h1>
				<div className="container flex flex-col">
					<div className="max-w-md mx-24"></div>
					<div className="container flex flex-row items-center mt-5">
						<div className="ml-3">
							<button
								className="text-gray-800 transition duration-500 ease-in-out hover:text-white"
								onClick={prevPage}
							>
								<BsFillArrowLeftCircleFill size="40px" />
							</button>
						</div>
						<div className="container flex flex-wrap justify-center">
							{allUsers &&
								usersToShow.map(user => {
									return <UserCard user={user} key={user.id} />;
								})}
						</div>
						<div className="mr-3">
							<button
								className="text-gray-800 transition duration-500 ease-in-out hover:text-white"
								onClick={nextPage}
							>
								<BsFillArrowRightCircleFill size="40px" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-12">
				<Footer />
			</div>
		</div>
	);
}
