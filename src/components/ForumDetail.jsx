import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
      <div className="border my-8">
        <h1>FORUM DETAIL</h1>
        <div>
          <p>{ details?.title }</p>
          { details?.text }
        </div>
        <AnswerForum forumId={ id } comments={ details.answers }/>
        { details?.answers?.map((e) => (
            <div key={ e.id }>{ e.comment }</div>
        )) }
        {/*<ForumAnswers />*/ }
      </div>
  );
}
