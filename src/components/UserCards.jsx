import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFriendForChat } from '../redux/actions';
import Loader from '../components/Loader';

export default function UserCard({ user, dataUser }) {
	const dispatch = useDispatch();

	const handleOnClick = (e, deleteFriend) => {
		e.preventDefault();
		dispatch(addFriendForChat(dataUser.id, user.id, deleteFriend));
	};

	return (
		<div className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-20 max-w-xs">
			<img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto" src={user?.img} alt={user?.nickname} />
			<div className="text-lg text-gray-700">
				<Link to={`/profile/${user?.id}`}>{user?.nickname}</Link>
			</div>
			<p className="text-sm text-gray-400 ">{user?.description}</p>
			<br></br>
			{dataUser?.friends?.some(e => e === user?.id) ? (
				<button
					onClick={e => handleOnClick(e, "yes")}
					className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
				>
					Remove
				</button>
			) : (
				<button
					onClick={e => handleOnClick(e, "no")}
					className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
				>
					Add!
				</button>
			)}
		</div>
	);
}
