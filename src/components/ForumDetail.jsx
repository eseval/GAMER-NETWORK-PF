import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getForum } from "../redux/actions";
import AnswerForum from "./AnswerForum";

export default function ForumDetail() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.forumById);
  // console.log(details);

  useEffect(() => {
    dispatch(getForum(id));
  }, [dispatch, id]);

  return (
      <div>
        <div
            className="my-4 mx-4 p-4 bg-white rounded-lg border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 h-40 h-fit w-fit min-w-1/2">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              { details.title }
            </h5>
            <div className="rounded overflow-hidden shadow-lg bg-slate-400 w-fit min-w-1/2">
              <p className="p-1">{ details?.text }</p>
            </div>
          </div>
        </div>
        <AnswerForum forumId={ id } comments={ details?.answers }/>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-400 mx-5 mb-10 max-w-screen-md my-3">
          { details?.answers?.map((e) => (
              <div key={ e.id } className="border">
                <div className="mx-5 my-6 px-4">
                  <div className="flex my-2">
                    <img
                        className="w-12 h-12 rounded-full mr-2"
                        src={ e.user.img }
                        alt=""
                    />
                    <span className="text-base font-bold">{ e.user.nickname }</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-base">{ e.comment }</p>
                  </div>
                </div>
              </div>
          )) }
        </div>
      </div>
  );
}
