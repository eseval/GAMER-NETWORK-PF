import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanForum, getForum } from "../redux/actions";

export default function ReportForumPost() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const details = useSelector(state => state.forumById);
  const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);

  // console.log(dataUser);

  // console.log(details);

  useEffect(() => {
    dispatch(getForum(id));
    return () => {
      dispatch(cleanForum());
    }
  }, [dispatch, id]);

  const [input, setInput] = useState({
    report: [],
  })



  function handleOnClick(e) {
    setInput({
      ...input,
      report: dataUser.id,
    })
  }
  console.log(input);


  return (
      <div>
        <button
            onClick={e => handleOnClick(e)}
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Report Post
        </button>
      </div>
  )
}