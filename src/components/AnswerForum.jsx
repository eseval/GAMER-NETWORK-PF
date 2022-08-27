import React, { useEffect, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import merge from "lodash/merge";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, postForumAnswers } from "../redux/actions";

const AnswerForum = () => {
  const dataUser = JSON.parse(window.localStorage.userLogged);

  const dispatch = useDispatch();

  const [value, setValue] = useState({
    username: "",
    comment: "",
  });

  const [comments, setComments] = useState([]);

  const user = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(postForumAnswers(comments));
  }, [dispatch]);

  const userNickname = user.map((user) => {
    return {
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

  const handleSubmit = () => {
    if (value.comment === "") {
      alert("Please fill in all fields");
      return;
    }
    setComments({
      username: "",
      comment: "",
    });
  };
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <div className="border my-8">
      <h1>ANSWER FORUM</h1>
      <section>
        <h2>Let's get started</h2>
        <input
          disabled={true}
          type="text"
          value={dataUser.nickname}
          onChange={(e) => setValue({ ...value, username: e.target.value })}
          placeholder="Input your Name"
        />
        <MentionsInput
          placeholder="Add Comment. Use '@' for mention"
          style={customStyle}
          // value={value.comment}
          // onChange={(e) => setValue({ ...value, comment: e.target.value })}

          a11ySuggestionsListLabel={"Suggested mentions"}
        >
          <Mention data={userNickname} />
        </MentionsInput>
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
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
