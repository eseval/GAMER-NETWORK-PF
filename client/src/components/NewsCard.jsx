import { Link } from "react-router-dom";

export default function NewsCard({ allNews }) {
  // ESTA RUTA VA A MAPEAR TODAS LAS NOTICIAS Y MOSTRAR EL RESUMEN


  return (
    allNews && allNews.map(news => {
      return (
        <div>
          <Link to={`news/${news.id}`}>{news.title}</Link>
        </div>
      )
    })
  )
}