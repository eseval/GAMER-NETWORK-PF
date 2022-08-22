import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getNewsById } from "../redux/actions";

export default function NewDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector(state => state.news[0])
  const isLoading = useSelector(state => state.isLoadingNews);

  useEffect(() => {
    dispatch(getNewsById(id));
  }, [dispatch, id])

  console.log(news)
  if(isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  } else {
    return (
      <div className="container flex justify-center mx-auto mt-10">
        <div className="max-w-6xl mx-5 mb-10 overflow-hidden rounded shadow-lg bg-slate-200">
          <div className="mx-5 mt-3">
            <Link className="text-lg text-indigo-800" to='/home'>Return to Home</Link>  
          </div>
          <div className="flex flex-col justify-center px-6 py-4 align-middle">
            <div className="text-5xl font-bold">
              {news.title}
            </div>
            <p className="mt-6 text-center text-gray-700">{news.short_description}</p>
            <img className="max-w-3xl mx-auto mt-3 rounded-md" src={news.main_image} alt={news.title}/>
            <p className="mt-5 ">{news.article_content.replace(/<[^>]+>/g, '')}</p>
          </div>
        </div>
      </div>
    )
  }
}