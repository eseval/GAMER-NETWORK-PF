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
        <Link to="/forum">Go back</Link>
        <div className="container flex flex-col items-center align-middle">
          <div className="p-4 mx-4 my-4 bg-gray-800 border-gray-700 rounded-lg shadow-md h-fit w-fit min-w-1/2">
            <div>
              <div className="flex flex-row-reverse items-center justify-end align-middle">
                <h3 className="max-w-2xl mx-5 text-xl font-semibold text-white">{details?.user?.nickname}</h3>
                <div className="w-16 h-16 overflow-hidden border-2 border-gray-400 rounded-full">
                  <img src={details?.user?.img} className='object-cover w-full h-full' alt={dataUser.nickname}/>
                </div>
              </div>
              <h5 className="mb-2 text-3xl font-semibold tracking-tight text-center text-white">
                { details.title }
              </h5>
              <div className="h-64 overflow-hidden rounded shadow-lg bg-slate-400 ">
                <p className="p-1">{ details?.text }</p>
              </div>
              <div className="mt-5 text-slate-600">
                <p>Created at: {details?.createdAt?.split("T")[0]} - {details?.createdAt?.split("T")[1].split(":")[0]}:{details?.createdAt?.split("T")[1].split(":")[1]}</p>            
                <p>Last update : {details?.updatedAt?.split("T")[0]} - {details?.updatedAt?.split("T")[1].split(":")[0]}:{details?.updatedAt?.split("T")[1].split(":")[1]}</p>            
                <h4>Comments: {details?.answers?.length}</h4>
              </div>
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
