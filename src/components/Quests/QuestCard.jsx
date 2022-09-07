import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { claimMission } from '../../redux/actions';

export default function QuestCard({ mission, missionsCompletedByUser }) {
	let dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);
	const [active, setActive] = useState('z');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let missionsCompleted = [];

	const handleClick = e => {
		e.target.value !== active ? setActive(e.target.value) : setActive('z');
	};

	if (dataUser?.favoriteGames?.length > 4 && mission.name === 'Games I') {
		missionsCompleted.push(mission.id);
	}
	if (dataUser?.favoriteGames?.length > 24 && mission.name === 'Games II') {
		missionsCompleted.push(mission.id);
	}
	if (dataUser?.favoriteGames?.length > 49 && mission.name === 'Games III') {
		missionsCompleted.push(mission.id);
	}
	if (dataUser?.friends?.length > 4 && mission.name === 'Add friends I') {
		missionsCompleted.push(mission.id);
	}
	if (dataUser?.friends?.length > 14 && mission.name === 'Add friends II') {
		missionsCompleted.push(mission.id);
	}
	if (dataUser?.friends?.length > 44 && mission.name === 'Add friends III') {
		missionsCompleted.push(mission.id);
	}
	if (dataUser?.plan == 'true' && mission.name === 'Suscribe to premium') {
		missionsCompleted.push(mission.id);
	}
	if (dataUser?.formus.length >= 5 && mission.name === 'Participate in the forum I') {
		missionsCompleted.push(mission.id);
	}
	if (dataUser?.formus.length >= 25 && mission.name === 'Participate in the forum II') {
		missionsCompleted.push(mission.id);
	}
	if (dataUser?.formus.length >= 50 && mission.name === 'Participate in the forum III') {
		missionsCompleted.push(mission.id);
	}

	const handleOnClick = () => {
		navigate(`/${mission.route}`);
	};

	const handleSubmit = () => {
		mission.coinsRewards = mission.coinsRewards + dataUser.coins;
		dispatch(claimMission(mission.id, mission.coinsRewards, dataUser.id));
	};

	return (
		<div>
			<div key={mission.id} className="flex-col p-6 my-5 text-sm rounded-md bg-slate-800">
				<div className="flex items-center w-full p-4 text-sm leading-7">
					<img className="mr-1.5 items-center w-16" src={mission.icon} alt="img not found" />
					<div className="flex flex-col w-full">
						<h3 className="text-sm font-bold text-left">{mission.name}</h3>
						<span>💎 {mission.coinsRewards}</span>
					</div>
					{}
					<button
						onClick={e => handleClick(e, mission.id)}
						value={mission.id}
						className="float-right px-4 py-2 font-bold text-white uppercase bg-blue-500 rounded-full hover:bg-blue-700"
					>
						Go
					</button>
				</div>
				{active === mission.id ? (
					<div className="flex flex-col items-center w-full p-4 text-xs border rounded-lg bg-slate-800">
						<h3 className="text-sm font-bold leading-5 text-left ">{mission.description}</h3>
						<p className="flex items-center p-4 text-xs leading-3">{mission.name}</p>
						{missionsCompleted.includes(mission.id) &&
						!missionsCompletedByUser.filter(e => e.id === mission.id).length > 0 ? (
							<button
								className="float-right px-4 py-2 font-bold text-white uppercase bg-green-500 rounded-full hover:bg-green-700"
								onClick={e => handleSubmit(e)}
							>
								Claim
							</button>
						) : !missionsCompletedByUser.filter(e => e.id === mission.id).length > 0 ? (
							<button
								onClick={e => handleOnClick(e)}
								className="float-right px-4 py-2 font-bold text-white uppercase bg-blue-500 rounded-full hover:bg-blue-700"
							>
								Go to the mission
							</button>
						) : (
							<button
								disabled
								className="float-right px-4 py-2 font-bold text-white uppercase bg-blue-700 rounded-full"
							>
								Claimed
							</button>
						)}
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);
}
