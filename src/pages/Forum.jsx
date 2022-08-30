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
        <div className="container max-w-4xl p-4">
          <div className="my-8 mb-10 overflow-hidden rounded shadow-lg bg-slate-400">
            <ContainerForum/>
          </div>
        </div>
        <Footer/>
      </div>
  );
}
