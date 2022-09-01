import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getNewsById, cleanNewsState } from '../redux/actions';
import Loader from '../components/Loader';

export default function NewDetail() {
	const { id } = useParams();
	const dispatch = useDispatch();
	let news = useSelector(state => state.news[0]);

	useEffect(() => {
		dispatch(getNewsById(id));
		return () => {
			dispatch(cleanNewsState());
		};
	}, [dispatch, id]);

	while (Number(!news) || Number(id) !== Number(news.id)) {
		return (
			<div className="container text-center">
				<h1 className="text-8xl font-totifont opacity-70 text-white my-20">Play Center</h1>
				<div className="mt-10">
					<Loader width={8} />
				</div>
			</div>
		);
	}
	return (
		<div className="container flex justify-center mx-auto mt-10">
			<div className="max-w-6xl mx-5 mb-10 overflow-hidden rounded shadow-lg bg-slate-200">
				<div className="mx-5 mt-3">
					<Link className="text-lg text-indigo-800" to="/home">
						<img
							className="h-12 w-12"
							src="https://cdn-icons-png.flaticon.com/512/5166/5166467.png"
							alt="Return"
						/>
					</Link>
				</div>
				<div className="flex flex-col justify-center px-6 py-4 align-middle">
					<div className="text-5xl font-bold">{news.title}</div>
					<p className="mt-6 text-2xl my-2 text-center text-gray-700 space-x-1 space-y-1">
						{news.short_description}
					</p>
					<img className="max-w-3x1 mx-auto mt-3 rounded-md" src={news.main_image} alt={news.title} />
					<p className="mt-6 text-2xl text-justify indent-8 space-x-1 space-y-1">
						{news.article_content.replace(/<[^>]+>/g, '')}
					</p>
				</div>
			</div>
		</div>
	);
}
