import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewsCard from './NewsCard';
import { getAllNews, cleanAllNewsState } from '../redux/actions';
import Paginate from './Paginate.jsx';
import SearchBar from '../components/SearchBar';

export default function NewsContainer() {
	const dispatch = useDispatch();
	const allNews = useSelector(state => state.allNews);
	const [currentPage, setCurrentPage] = useState(1);
	const [newsPerPage] = useState(12);
	const indexOfLastNew = currentPage * newsPerPage;
	const indexOfFirstNew = indexOfLastNew - newsPerPage;
	const currentNews = allNews.slice(indexOfFirstNew, indexOfLastNew);
	const paginate = pageNumber => {
		setCurrentPage(pageNumber);
	};

	if (currentPage > Math.ceil(allNews.length / newsPerPage) && currentPage !== 1) {
		setCurrentPage(1);
	}

	useEffect(() => {
		dispatch(getAllNews());
		return () => {
			dispatch(cleanAllNewsState());
		};
	}, [dispatch]);

	return (
		<div className="container">
			<h1 className="mt-5 mx-5 text-7xl opacity-85 font-totifont text-center text-white">NEWS</h1>
			<SearchBar className="inset-px " />
			<div className="mt-3 container flex flex-wrap justify-center">
				{typeof allNews === 'object' ? (
					currentNews.map(news => {
						return <NewsCard news={news} key={news.id} />;
					})
				) : (
					<p>News not found</p>
				)}
			</div>
			{typeof allNews === 'object' ? (
				<Paginate thingPerPage={newsPerPage} array={allNews} paginate={paginate} />
			) : (
				''
			)}
		</div>
	);
}
