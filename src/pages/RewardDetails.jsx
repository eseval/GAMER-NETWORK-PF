import React from 'react';
import { useEffect } from 'react';
import { claimRewards, getRewardsById } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

export default function RewardDetails() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const reward = useSelector(state => state.rewardsById);
	const dataUser = JSON.parse(window.localStorage.userLogged);

	useEffect(() => {
		dispatch(getRewardsById(id));
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		const newTotal = dataUser.coins - reward.price;
		dataUser.coins = newTotal;
		if (newTotal > 0) {
			dispatch(claimRewards(dataUser, dataUser.id));
		} else {
			console.log('Insufficient balance!');
		}
	};
	return (
		<div>
			<a
				href="#"
				class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
			>
				<img
					class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
					src={reward.image}
					alt="Image not found!"
				/>
				<div class="flex flex-col justify-between p-4 leading-normal">
					<h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{reward.title}</h3>
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						💰{reward.price} Coins
					</h5>
					<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{reward.recompenseType}</p>
				</div>
				<button
					class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
					onClick={e => handleSubmit(e)}
				>
					<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
						Claim
					</span>
				</button>
			</a>
		</div>
	);
}
