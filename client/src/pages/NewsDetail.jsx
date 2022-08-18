import { useParams } from "react-router"


export default function NewsDetail({ news }) {
  // ESTA RUTA VA A MOSTRAR LA NOTICIA COMPLETA 
  const { id } = useParams();
  
  return (
    <div>
      NEWS
    </div>
  )
}