import { useEffect } from "react";
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
}