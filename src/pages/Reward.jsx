import React, { useEffect, useState } from 'react';
import { getRewards, cleanRewardState } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import RewardCard from '../components/RewardCard';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import Paginate from '../components/Paginate';
import Footer from '../components/Footer';

export default function Reward() {
	const dispatch = useDispatch();
	let rewards = useSelector(state => state.rewards);
	const navigate = useNavigate();
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);
	const [currentPage, setCurrentPage] = useState(1);
	const [rewardsPerPage] = useState(4);
	const indexOfLastreward = currentPage * rewardsPerPage;
	const indexOffirstreward = indexOfLastreward - rewardsPerPage;
	const currentReward = rewards.slice(indexOffirstreward, indexOfLastreward);
	const paginate = pageNumber => {
		setCurrentPage(pageNumber);
	};

	rewards = rewards.filter(e => !e.deleted === true && !e.available === false);

	useEffect(() => {
		dispatch(getRewards());
		return () => {
			dispatch(cleanRewardState());
		};
	}, [dispatch]);

	useEffect(() => {
		if (!dataUser || dataUser === '') {
			navigate('/');
		}
	}, [dataUser, navigate]);

	if (currentPage > Math.ceil(rewards.length / rewardsPerPage) && currentPage !== 1) {
		setCurrentPage(1);
	}

	return (
		<div>
			<NavBar />
			<div className="flex flex-row">
				{[...currentReward].map(re =>
					re.deleteFlag === false && re.available === true ? (
						<RewardCard
							title={re.title}
							image={re.image}
							price={re.price}
							recompenseType={re.recompenseType}
						/>
					) : (
						''
					)
				)}
			</div>
			<Paginate array={rewards} thingPerPage={rewardsPerPage} paginate={paginate} />
			<div></div>
			<Footer />
		</div>
	);
}
