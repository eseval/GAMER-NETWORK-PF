import ContainerForum from "../components/ContainerForum";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/NavBar";

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
      <NavBar />
      <div className="container max-w-5xl p-4">
        <h1 className='m-5 text-5xl font-semibold text-center text-white'>Forum</h1>
        <div className="my-8 mb-10 overflow-hidden bg-gray-700 rounded shadow-lg">
          <ContainerForum />
        </div>
      </div>
    </div>
  );
}
