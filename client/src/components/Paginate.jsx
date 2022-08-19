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