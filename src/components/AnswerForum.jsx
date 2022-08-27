import React, { useEffect, useState } from "react";
import merge from "lodash/merge";
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

  let customStyle = merge(
    {},
    {
      input: {
        height: 80,
        overflow: "auto",
      },
      highlighter: {
        height: 80,
        overflow: "hidden",
        boxSizing: "border-box",
      },
    }
  );

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
      <h1>ANSWER FORUM</h1>
      <section>
        <h2>Let's get started</h2>
        <p>{dataUser.nickname}</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder="Add your comment"
            style={customStyle}
            value={value.comment}
            onChange={(e) => handleOnChange(e)}
          ></input>
          <button type="submit">Submit</button>
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
