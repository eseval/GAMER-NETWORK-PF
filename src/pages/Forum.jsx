import ContainerForum from "../components/ContainerForum";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Forum() {
  const navigate = useNavigate();
  const dataUser = !window.localStorage.userLogged
      ? ""
      : JSON.parse(window.localStorage.userLogged);
  useEffect(() => {
    if (!dataUser || dataUser === "") {
      navigate("/");
    }
  }, [dataUser, navigate]);

  return (
      <div>
        <NavBar/>
        <div className="container p-4">
          <div className="text-4xl font-normal text-center text-gray-900 dark:text-white">
            <Link to="/post">
              <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                NEW POST
              </button>
            </Link>
          </div>
          <div className="my-8 mb-10 overflow-hidden rounded shadow-lg bg-slate-400">
            <ContainerForum/>
          </div>
        </div>
        <Footer/>
      </div>
  );
}
