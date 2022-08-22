/* import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import NewsCard from "./NewsCard"
import { getAllNews } from "../redux/actions";

export default function NewsContainer() {
  // ESTA RUTA VA A CONTENER TODAS LAS NOTICIAS CON FILTRADO Y LAS VA A PASAR A NEWS CARD
  // NO TE OLVIDES DEL FILTRADO!!
  const dispatch = useDispatch();
  const allNews = useSelector(state => state.allNews);
  
  useEffect(() => {
    dispatch(getAllNews())
  }, [dispatch]);
  
  return (
    <div className="container">
      <h1 className="m-5 text-5xl font-semibold text-center text-white">News</h1>
      <div className="container flex flex-wrap justify-center">
        {allNews && allNews.map(news => {
          return <NewsCard news={news} />
        })}
      </div>
    </div>
  )
} */

import { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import NewsCard from "./NewsCard"
import { getAllNews } from "../redux/actions";
import Paginate from "./Paginate.jsx";

export default function NewsContainer() {
  // ESTA RUTA VA A CONTENER TODAS LAS NOTICIAS CON FILTRADO Y LAS VA A PASAR A NEWS CARD
  // NO TE OLVIDES DEL FILTRADO!!
  const dispatch = useDispatch();
  const allNews = useSelector(state => state.allNews);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(12);
  const indexOfLastNew = currentPage * newsPerPage;
  const indexOfFirstNew = indexOfLastNew - newsPerPage; 
  const currentNews = allNews.slice(indexOfFirstNew, indexOfLastNew);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
};
  
  if (currentPage > Math.ceil(allNews.length / newsPerPage) && currentPage !== 1) {
    setCurrentPage(1);
}


  useEffect(() => {
    dispatch(getAllNews())
  }, [dispatch]);
  
  return (
    <div className="container">
        <Paginate
          newsPerPage={newsPerPage}
          allNews={allNews}
          paginate={paginate}
          /> 
      <h1 className="m-5 text-5xl font-semibold text-center text-white">News</h1>
      <div className="container flex flex-wrap justify-center">
        {typeof allNews === "object"  ? currentNews.map(news => {
          return <NewsCard news={news} key={news.id}/>
        }) : <p>News not found</p>}
      </div>
      <Paginate
          newsPerPage={newsPerPage}
          allNews={allNews}
          paginate={paginate}
          /> 
    </div>
  )
}
