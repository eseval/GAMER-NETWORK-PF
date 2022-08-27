import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getForumAnswers } from "../redux/actions";
import AnswerForum from "./AnswerForum";
import ForumAnswers from "./ForumAnswers";

export default function ForumDetail() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.forumAnswers);
  console.log(details);

  useEffect(() => {
    dispatch(getForumAnswers(id));
  }, [dispatch, id]);

  return (
      <div className="border my-8">
        <h1>FORUM DETAIL</h1>
        <div>
          <p>{ details?.title }</p>
          { details?.text }
        </div>
        <AnswerForum />
        <div>
          {/*<p>{details?.answers.map(e => e.comment)}</p>*/}
        </div>
        <ForumAnswers />
      </div>
  );
}
