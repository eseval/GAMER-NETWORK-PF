import React from "react";
import Paginate from '../styles/Paginate.css';

export default function Paginate ({ newsPerPage, allNews, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allNews.length / newsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className="paginate">
            {pageNumbers &&
            pageNumbers.map((number) => (
                <div key={number}>
                    <button className="currentPage" onClick={() => paginate(number)}>{number}</button>
                    </div>
            ))}
        </nav>
    );
}



//ESTO VA EN EL COMPONENTE HOME:

// const [currentPage, setCurrentPage] = useState(1);
// const [newsPerPage] = useState(12);
// const indexOfLastNew = currentPage * newsPerPage;
// const indexOfFirstNew = indexOfLastNew - newsPerPage;
// const currentNews = allNews.slice(indexOfFirstNew, indexOfLastNew);

// if (currentPage > Math.ceil(allNews.length / newsPerPage) && currentPage !== 1) {
//     setCurrentPage(1);
// }

// const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
// };

// function handleClick(e) {
//     e.preventDefault()
//     dispatch(getNews()) //getNews es un nombre ficticio, poner el nombre de la variable que 
                          //traiga todas las noticias, sacado del index de Actions
// };
// 