import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postForumAnswers } from "../redux/actions";

const AnswerForum = ({forumId, comments}) => {
  const dataUser = JSON.parse(window.localStorage.userLogged);

  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const [value, setValue] = useState({
    idForum: forumId,
    idUser: dataUser.id,
    comment: "",
    nickname: dataUser.nickname,
  });

  const user = useSelector((state) => state.users);

  useEffect(() => {
    setComment(comments);
  }, [comments]);

  const userNickname = user.map((user) => {
    return {
      key: user.id,
      id: user.id,
      display: user.nickname,
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.comment === "") {
      alert("Please fill in all fields");
    }
    dispatch(postForumAnswers(value));
    setValue({
      idForum: forumId,
      idUser: dataUser.id,
      comment: "",
      nickname: dataUser.nickname,
    });
  };
  const current = new Date();
  const date = `${ current.getDate() }/${
      current.getMonth() + 1
  }/${ current.getFullYear() }`;

  function handleOnChange(e) {
    e.preventDefault();
    setValue({...value, comment: e.target.value});
  }

  return (
      <div className="mx-4">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Answer this post
        </h3>
        <section>
          <form onSubmit={ (e) => handleSubmit(e) }>
            <div className="my-4">
              <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your Comment
              </label>
              <textarea
                  placeholder="Add your comment"
                  cols="50"
                  rows="5"
                  value={ value.comment }
                  onChange={ (e) => handleOnChange(e) }
                  className="max-w-xl block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
              <button
                  type="submit"
                  className="my-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  disabled={ !value.comment }
              >
                Submit
              </button>
              { " " }
            </div>
          </form>
        </section>
      </div>
  );
};

export default AnswerForum;
