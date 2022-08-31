import { Link } from 'react-router-dom';

import FavoriteGames from './FavoriteGames';

export default function UserCard({ user }) {
	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-200 mx-5 mb-10">
			<img className="w-full" src={user.img} alt={user.nickname} />
			<div className="px-6 py-4">
				<div className="font-bold text-xl mb-2">
					<Link to={`/profile/${user.id}`}>{user.nickname}</Link>
				</div>
				<p className="text-gray-700 text-base">{user.description}</p>
				<FavoriteGames user={user} />
				<button className="px-2 py-1 mx-auto mb-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-800">
					Match!
				</button>
			</div>
		</div>
	);
}
