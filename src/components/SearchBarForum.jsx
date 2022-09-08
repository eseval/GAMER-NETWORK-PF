import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchInForum } from '../redux/actions';

export default function ForumFilterByGenre() {
	const dispatch = useDispatch();

	function handleOnChange(e) {
		e.preventDefault();
		dispatch(searchInForum(e.target.value));
	}


	return (
		<input
			onChange={e => handleOnChange(e)}
			type="text"
			placeholder="Search in posts"
			class="py-2 px-2 border-2 border-gray-300 rounded-2xl w-full"
		/>
	);
}
