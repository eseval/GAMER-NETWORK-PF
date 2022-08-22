import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const NewFilter = () => {
   const dispatch = useDispatch();
   const [currentPage, setCurrentPage] = useState(1); // => aca va por la primera pagina , no se como hiceron el paginado pero se puede modificar.
   //dejo el estado en la pag 1 por las dudas , avisen y lo cambio . 

   const handleFilterOrder = (e) => {
      e.preventDefault();
      dispatch(filterOrder(e.target.value));
      setCurrentPage(1); // => aca estoy pasando el estado seteado por la pag 1 de nuevo , avisen y la cambio . 
   }

   return (
      <div>
         <select onChange={(e) => { handleFilterOrder(e) }}>
            <option value="all">Order Page</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
         </select>
      </div>
   )
}

export default NewFilter;