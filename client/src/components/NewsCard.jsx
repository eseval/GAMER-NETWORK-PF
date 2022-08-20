import { Link } from "react-router-dom";

export default function NewsCard({ news }) {
  // ESTA RUTA VA A MAPEAR TODAS LAS NOTICIAS Y MOSTRAR EL RESUMEN
  return (
  <div class="max-w-sm rounded overflow-hidden shadow-lg bg-slate-200 mx-5 mb-10">
    <img class="w-full" src={news.main_image} alt={news.title}/>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">
        <Link to={`/news/${news.id}`}>{news.title}</Link>
      </div>
      <p class="text-gray-700 text-base">{news.short_description}</p>
    </div>
  </div>
  )
}