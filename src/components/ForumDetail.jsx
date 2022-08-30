import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { cleanForum, getForum } from "../redux/actions";
import AnswerForum from "./AnswerForum";
import NavBar from "./NavBar";

export default function ForumDetail() {
  
  const {id} = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.forumById);
  // console.log(details);
  
  const navigate = useNavigate();
  const dataUser = !window.localStorage.userLogged
    ? ""
    : JSON.parse(window.localStorage.userLogged);
  
    useEffect(() => {
    if (!dataUser || dataUser === "") {
      navigate("/");
    }
  }, [dataUser, navigate]);

  useEffect(() => {
    dispatch(getForum(id));
    return()=>{dispatch(cleanForum())}
  }, [dispatch, id]);

  return (
      <div>
        <NavBar/>
        <div className="container flex flex-col max-w-5xl p-4 my-5 align-middle bg-gray-200 border-gray-700 rounded-lg shadow-md">
          <Link to="/forum">
            <button
            type="button"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              All posts
            </span>
          </button>
          </Link>

          <div className="mt-5">
            <div className="flex flex-row-reverse justify-between">
              <div className="flex flex-row items-center">
                <h3 className="mx-2 text-xl font-semibold text-gray-900">{details?.user?.nickname}</h3>
                <div className="w-24 h-24 overflow-hidden border border-gray-600 rounded-full">
                  <img src={details?.user?.img} className='object-cover w-full h-full' alt={dataUser.nickname}/>
                </div>
              </div>
              <div className="mt-5 text-gray-500">
                <p>Created: {details?.createdAt?.split("T")[0]} - {details?.createdAt?.split("T")[1].split(":")[0]}:{details?.createdAt?.split("T")[1].split(":")[1]}</p>            
                <p>Last update : {details?.updatedAt?.split("T")[0]} - {details?.updatedAt?.split("T")[1].split(":")[0]}:{details?.updatedAt?.split("T")[1].split(":")[1]}</p>            
                <p>Comments: {details?.answers?.length}</p>
              </div>
            </div>
            <div className="text-center overscroll-contain">
              <h3 className="my-3 text-5xl tracking-tight text-gray-900">{ details?.title }</h3>
            </div>
            <div className="my-5 overflow-hidden h-fit w-fit">
              <p className="m-1 text-gray-800 indent-1">{ details?.text }</p>
            </div>
          </div>

          <AnswerForum forumId={ id } comments={ details?.answers }/>
          <div className="max-w-sm mx-5 my-3 mb-10 overflow-hidden rounded shadow-lg bg-slate-400">
            { details?.answers?.map((e) => (
                <div key={ e.id } className="border">
                  <div className="px-4 mx-5 my-6">
                    <div className="flex my-2">
                      <img
                          className="w-12 h-12 mr-2 rounded-full"
                          src={ e.user.img }
                          alt=""
                      />
                      <span className="text-base font-bold">{ e.user.nickname }</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-base text-gray-700">{ e.comment }</p>
                      <p>Created at: {e?.createdAt?.split("T")[0]} - {e?.createdAt?.split("T")[1].split(":")[0]}:{e?.createdAt?.split("T")[1].split(":")[1]}</p>            
                    </div>
                  </div>
                </div>
            )) }
          </div>
        </div>
      </div>
  );
}
