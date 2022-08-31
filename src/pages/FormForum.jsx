import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { editPost, getAllPosts, getGenres, postForum } from "../redux/actions";
// import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function FormForum() {
  const navigate = useNavigate();
  let id = "";
  id = useParams();
  const allGenres = useSelector((state) => state.genres);

  const dataUser = !window.localStorage.userLogged
    ? ""
    : JSON.parse(window.localStorage.userLogged);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataUser || dataUser === "") {
      navigate("/");
    }
  }, [dataUser, navigate]);

  const [input, setInput] = useState({
    userId: dataUser.id,
    nickname: dataUser.nickname,
    text: "",
    title: "",
    genra: "",
  });

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (!id.id) {
      dispatch(postForum(input));
    } else {
      dispatch(editPost(id.id, input));
      console.log(id);
    }
    dispatch(getAllPosts());
    navigate("/forum");
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  function handleOnChangeGenre(e) {
    setInput({
      ...input,
      genra: e.target.value,
    });
    console.log(input, e.target.value);
  }

  return (
    <div>
      <NavBar />
      <div className="p-8 ">
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div className=" flex w-1/2 ">
            <div className="mr-6">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Forum Title
              </label>
              <input
                className="max-w-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                placeholder="Title"
                name="title"
                value={input.title}
                onChange={(e) => handleOnChange(e)}
              />
            </div>

          <div className="w-fit">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Choose a genre:
            </label>
            <select
              onChange={(e) => handleOnChangeGenre(e)}
              className="block p-2.5 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected disabled hidden>
                Choose a genre
              </option>
              {allGenres.map((genre, i) => {
                return (
                  <option key={i} value={i.name}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </div>
          </div>

          <div className="my-12">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              name="text"
              value={input.text}
              onChange={(e) => handleOnChange(e)}
              cols="50"
              rows="5"
              className="max-w-xl block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            disabled={!input.text || !input.title || !input.genra}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
