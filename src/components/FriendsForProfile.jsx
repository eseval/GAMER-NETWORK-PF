import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFriendForChat, getAllFriends } from '../redux/actions/index';

export default function FriendsForProfile({ friendsIds, id }) {
	let dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);
	const dispatch = useDispatch();

	function handleOnClick(event, newFriendId, deleteFriend) {
		dispatch(addFriendForChat(dataUser.id, newFriendId, deleteFriend))
	}
	useEffect(() => {
		dispatch(getAllFriends(dataUser.friends))
	}, [getAllFriends, dispatch])

	let friends = useSelector((state) => state.friends);

	return (
		friends?.length > 0 ?

			<div>
				<p className="text-lg font-semibold text-white space-y-2.5 container flex flex-row">Friends: </p>
				{friends?.map(e =>
					<div
						key={e.id}
						className=" flex flex-row justify-between w-64 h-64 m-2 overflow-hidden text-center align-middle bg-gray-900 border border-gray-700 rounded-md shadow-lg items-center"
					>
						<div className="container flex flex-row items-center">
							<div className="ml-1">
								<img src={e.img} className="h-20 rounded-full" />
								<h2 className="text-lg font-semibold text-white space-y-2.5">Nickname:  {e.nickname}</h2>
								{
									dataUser.id === id ?
										<button className="px-6 py-2 mt-3 mx-auto mb-3 text-sm text-white rounded-lg " onClick={event => handleOnClick(event, e.id, "yes")}>


											<img
												className="h-8 w-8"
												src="https://cdn-icons-png.flaticon.com/512/458/458594.png"
												alt="X"
											/></button> :
										""
								}
							</div>
						</div>
					</div>
				)}
			</div>

			: <div>No friends found</div>


	)
}
