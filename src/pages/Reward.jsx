import React from 'react';
import { useEffect } from 'react';
import { getRewards, claimRewards } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import RewardCard from '../components/RewardCard';
// import { useState } from 'react';

export default function Reward() {
	const dispatch = useDispatch();
	const rewards = useSelector(state => state.rewards);

	useEffect(() => {
		dispatch(getRewards());
	}, []);

	return (
		<div>
			{[...rewards].map(re => (
				<RewardCard
					id={re.id}
					title={re.title}
					image={re.image}
					price={re.price}
					recompenseType={re.recompenseType}
				/>
			))}
		</div>
	);
}
