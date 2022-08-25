import { forumAnswers } from "../data";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { useState } from "react";

export default function ForumAnswers() {
  const [likes, setLikes] = useState(0);

  function handleOnClick1() {
    setLikes(likes + 1);
  }

  function handleOnClick2() {
    setLikes(likes - 1);
  }

  return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-400 mx-5 mb-10 max-w-screen-md ">
        { forumAnswers.map((answer) => (
            <div className="mx-5 my-6 px-4">
              <div className="flex my-2">
                <img
                    className="w-12 h-12 rounded-full mr-2"
                    src={ answer.img }
                    alt=""
                />
                <span className="text-base font-bold">{ answer.username }</span>
              </div>
              <div className="flex-1 ">
                <p className="text-gray-700 text-base">{ answer.answer }</p>
              </div>
              <div className="flex">
                <button
                    className="my-2 cursor-pointer mx-1"
                    onClick={ handleOnClick1 }
                >
                  <AiFillLike/>
                </button>
                <button
                    className="my-2 cursor-pointer mx-1"
                    onClick={ handleOnClick2 }
                >
                  <AiFillDislike/>
                </button>
                <p className="px-2">{ likes }</p>
              </div>
            </div>
        )) }
      </div>
  );
}
