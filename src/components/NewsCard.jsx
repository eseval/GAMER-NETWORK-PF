import { Link } from 'react-router-dom';

export default function NewsCard({ news }) {
	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-200 mx-5 mb-10">
			<img className="w-full" src={news.main_image} alt={news.title} />
			<div className="px-6 py-4">
				<div className="font-bold text-xl mb-2">
					<Link to={`/news/${news.id}`}>{news.title}</Link>
				</div>
				<p className="text-gray-700 text-base">{news.short_description}</p>
			</div>
		</div>
	);
}
