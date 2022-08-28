import React from "react";

export default function Paginate({ newsPerPage, allNews, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allNews.length / newsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
      <div className="container flex items-center mx-auto">
        <nav className="relative z-0 inline-flex items-center w-auto mx-auto mb-5 -space-x-px rounded-md shadow-sm">
            {pageNumbers &&
            pageNumbers.map((number) => (
              <div key={number}>
                <button className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-500 rounded-md bg-indigo-50" onClick={() => paginate(number)}>{number}</button>
              </div>
            ))}
        </nav>
      </div>
    );
}