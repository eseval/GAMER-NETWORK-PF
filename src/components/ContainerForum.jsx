import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPosts } from "../redux/actions";
import Loader from "../components/Loader";
import Paginate from "./Paginate";
import ForumFilterByMostComments from "../components/ForumFilterByMostComments"

export default function ContainerForum() {
  const dataUser = !window.localStorage.userLogged
      ? ""
      : JSON.parse(window.localStorage.userLogged);
  const dispatch = useDispatch();
  
  const themes = useSelector((state) => state.posts);
  
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(12);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage; 
  const currentPost = themes?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
};
  
  if (currentPage > Math.ceil(themes?.length / postPerPage) && currentPage !== 1) {
    setCurrentPage(1);
}


  while (!themes) {
    return (
        <div className="container text-center">
          <h1 className="text-5xl font-semibold text-white">Play Center</h1>
          <div className="mt-10">
            <Loader />
          </div>
        </div>
    );
  }

  return (
    <div>
      <div>
      <ForumFilterByMostComments/>
      </div>
      <div className="grid grid-cols-4">
        { currentPost.length > 0
            ? currentPost.map((e) => {
              return (
                  <div key={ e.id }>
                    { e.deleteFlag === true ? (
                      ""
                    ) : (
                        <div className="p-2 border-2">
                          <div
                              className="h-40 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <ul className="w-56 p-2 menu bg-base-100 rounded-box">
                              <li>
                                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    { e.title.length<=16? e.title : e.title.slice(0,16)+"..." }
                                  </h5>
                              </li>
                            </ul>
                            <div className="flex justify-between">
                              <div>
                                <a
                                    href={ `/postDetails/${ e.id }` }
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                  Read more
                                  <svg
                                      aria-hidden="true"
                                      className="w-4 h-4 ml-2 -mr-1"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                  </svg>
                                </a>
                              </div>
                              <div>
                                { e.deleteFlag === false &&
                                e.userId === dataUser.id ? (
                                    <Link to={ `/post/${ e.id }` }>
                                      <button
                                          type="button"
                                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                      >
                                        Edit Post
                                      </button>
                                    </Link>
                                ) : (
                                    ""
                                ) }
                              </div>
                            </div>
                          </div>
                        </div>
                    ) }
                  </div>
              );
            })
            : "" }
      </div>
      <Paginate thingPerPage={postPerPage} array={themes} paginate={paginate} />
    </div>
  );
}
