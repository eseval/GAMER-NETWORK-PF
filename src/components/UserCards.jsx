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
		<div class="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mx-10 mt-10 mb-5">
			<div class="flex flex-col items-center pb-10">
				<img class="w-36 h-36 rounded-full shadow-lg mt-10" src={user?.img} alt={user?.nickname} />
				<h5 class="text-4xl font-medium text-gray-900 hover:text-gray-600 dark:text-white mt-5">
					<Link to={`/profile/${user?.id}`}>{user?.nickname}</Link>
				</h5>
				<span class="text-sm text-gray-500 dark:text-gray-400 mt-5">{user?.description}</span>
				<div class="flex mt-5 space-x-3 md:mt-7">
					{dataUser?.friends?.some(e => e === user?.id) ? (
						<a class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-red-800 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-800 dark:bg-red-800 dark:hover:bg-red-600 dark:focus:ring-red-800">
							<button onClick={e => handleOnClick(e, 'yes')}>Remove</button>
						</a>
					) : (
						<a class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-green-600 bg-white rounded-lg border border-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-600 dark:bg-green-600 dark:text-white dark:border-green-600 dark:hover:bg-green-500 dark:hover:border-green-500 dark:focus:ring-green-500">
							<button onClick={e => handleOnClick(e, 'no')}>Add</button>
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
