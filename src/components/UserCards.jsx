import { Link } from 'react-router-dom';
// import FavoriteGames from './FavoriteGames';

export default function UserCard({ user }) {
	return (
		<div className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-20 max-w-xs">
			<img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto" src={user.img} alt={user.nickname} />
			<div className="text-lg text-gray-700">
				<Link to={`/profile/${user.id}`}>{user.nickname}</Link>
			</div>
			<p className="text-sm text-gray-400 ">{user.description}</p>
			<br></br>
			<button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
				Add!
			</button>
		</div>
	);
}
