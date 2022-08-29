import ContainerForum from "../components/ContainerForum";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Forum() {
  const navigate = useNavigate();
  const dataUser = !window.localStorage.userLogged
    ? ""
    : JSON.parse(window.localStorage.userLogged);
  useEffect(() => {
    if (!dataUser || dataUser === "") {
      navigate("/");
    }
  }, [dataUser]);

  return (
    <div className="p-4">
      <div className="text-4xl font-normal text-gray-900 dark:text-white text-center">
        <Link to="/post">
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            NEW POST
          </button>
        </Link>
      </div>
      <div className="my-8 rounded overflow-hidden shadow-lg bg-slate-400 mb-10">
        <ContainerForum />
      </div>
    </div>
  );
}
