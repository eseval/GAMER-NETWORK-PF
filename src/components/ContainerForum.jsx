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
      <div className="flex justify-between mx-5 my-3">
        <ForumFilterByMostComments/>
        <Link to="/post">
          <button
            type="button"
            className="relative inline-flex items-center justify-center p-0.5 ml-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              NEW POST
            </span>
          </button>
        </Link>
      </div>
      <table className="w-full text-left table-auto text-md">
        <thead className="text-gray-400 bg-gray-700 uppercas e">
          <tr>
            <th scope="col" className="px-6 py-3">Subject</th>
            <th scope="col" className="px-6 py-3 text-center">Author</th>
            <th scope="col" className="px-6 py-3 text-center">Comments</th>
            <th scope="col" className="px-6 py-3 text-center">Date</th>
          </tr>
        </thead>
        <tbody>
          { currentPost.length > 0 ? currentPost.map(post => {
              return (
                <>
                  { post.deleteFlag === true ? (<tr></tr>)
                    : 
                    <tr key={ post.id } className="bg-gray-800 border-b border-gray-700">
                      <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <Link to={`/postDetails/${ post.id }`}>
                          { post.title.length<=16? post.title : post.title.slice(0,16)+"..." }
                        </Link>
                      </th>
                      <td className="px-6 py-3 text-center text-gray-500">
                        { post.user !== null ? post.user.nickname : "Unknown user" }
                      </td>
                      <td className="px-6 py-3 text-center text-gray-500">
                        { post.answers.length > 0 ? post.answers.length : 0}
                      </td>
                      <td className="px-6 py-3 text-center text-gray-500">
                        {post?.createdAt?.split("T")[0]}
                      </td>
                    </tr>
                  }
                </>
              )
            }) 
          : "" } 
        </tbody>
      </table>
      <div className="mt-5">
        <Paginate thingPerPage={postPerPage} array={themes} paginate={paginate} />
      </div>
    </div>
  );
}
