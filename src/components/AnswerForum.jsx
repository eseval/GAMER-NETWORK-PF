import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postForumAnswers } from "../redux/actions";

const AnswerForum = ({ forumId, comments }) => {
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
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  function handleOnChange(e) {
    e.preventDefault();
    setValue({ ...value, comment: e.target.value });
  }

  return (
    <div className="border my-8">
      <h1>Answer this forum</h1>
      <section>
        <p className="text-lg font-bold">{dataUser.nickname}</p>
        <form onSubmit={(e) => handleSubmit(e)}>
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
              value={value.comment}
              onChange={(e) => handleOnChange(e)}
              className="max-w-xl block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
      {/*{comments.length === 0 ? null : (*/}
      {/*  <section>*/}
      {/*    /!*{comments.map((comment, i) => (*!/*/}
      {/*    /!*  <div key={i}>*!/*/}
      {/*    /!*    <p>*!/*/}
      {/*    /!*      {comment.username} on {date}*!/*/}
      {/*    /!*    </p>*!/*/}
      {/*    /!*    <h2>{comment.comment}</h2>*!/*/}
      {/*    /!*  </div>*!/*/}
      {/*    /!*))}*!/*/}
      {/*  </section>*/}
      {/*)}*/}
    </div>
  );
};

export default AnswerForum;
