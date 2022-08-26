import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getForumAnswers } from "../redux/actions";

export default function ForumDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getForumAnswers(id));
  }, [dispatch, id]);

  return(
      <div>
        {details.length > 0 ? details.map((e) => {
          return (
              <div>
                <h2>{e.title}</h2>
                <p>{e.text}</p>
              </div>
          )
        } ): "" }
      </div>
  )

}
