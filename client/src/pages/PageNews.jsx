import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const PageNews = () => {
   //https://blog.logrocket.com/react-pagination-scratch-hooks/?ref=morioh.com&utm_source=morioh.com => quiero usar este paginado , asi lo tengo
   // en mi pi videogames !!! 
   const newsAll = useSelector((state) => state.allNews);
   const [currentPage, setCurrentPage] = useState(1);
   const [newsPage, setNewsPage] = useState(10) // esto es solo un ejemplo 

   const indexAllNewsPage = currentPage * newsPage;
   const indexAllNews = indexAllNewsPage - newsPage;
   const allPage = allNews.slice(indexAllNewsPage, indexAllNews); // tengo que usar esta linera pero no me da 
   //la cabeza para ver ahora si lo uso aca o lo uso en el componte cotainer o el home !!!!! Necesito ayuda 

   const page = (p) => {
      setCurrentPage(p)
   }

   const numberPage = [];
   for (let i = 1; i <= Math.ceil(newsAll / newsPage); i++) {
      numberPage.push(i)
   }

   return (
      <div>
         {
            numberPage?.map((e) => {
               <a href="#"
                  key={e}
                  onClick={() => page(e)}
               >{e}</a>
            })
         }
      </div>
   )
}

export default PageNews