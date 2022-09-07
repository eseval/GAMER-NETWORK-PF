import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import QuestCard from "../components/Quests/QuestCard";
import { useNavigate } from 'react-router-dom';



const Quests = () => {
  // const dispatch = useDispatch();
  // const quests = useSelector((state) => state.mission);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);

  useEffect(() => {
    if (!dataUser || dataUser === '') {
      navigate('/');
    }
  }, [dataUser, navigate]);


  const [allMissions, setAllMissions] = useState([]);
  useEffect(() => {
    axios.get('https://pf-henry-gamesportal.herokuapp.com/missions')
      .then(res => {
        setAllMissions(res.data.sort(function (a, b) {
          if (a.name < b.name) return (-1)
          else if (a.name > b.name) return (1)
          else return 0
        })
        );
      })

  }, [setAllMissions]);

  return (
    <div>
      <NavBar />
      <div className="text-sm bg-indigo-900 text-slate-100 ">
        <div className="container mb-10">
          <h1 className="mx-5 mt-10 text-center text-white text-7xl opacity-85 font-totifont">Quests</h1>
        </div>
        {allMissions?.length === 0 ? (
          <div className="container mb-10">
            <h3 className="mx-5 mt-20 text-3xl text-center text-white opacity-85 font-totifont">No quests left</h3>
          </div>
        ) : 
        (
          <div className="container">
            {allMissions?.map((mission) => {
              return (
                <QuestCard mission={mission} missionsCompletedByUser={dataUser.missions} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quests;