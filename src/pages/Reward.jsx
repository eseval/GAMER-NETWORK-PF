import React, { useEffect } from "react";
import { getRewards } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import RewardCard from "../components/RewardCard";
// import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Reward() {
  const dispatch = useDispatch();
  const rewards = useSelector((state) => state.rewards);
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRewards());
  }, [dispatch]);

  const dataUser = !window.localStorage.userLogged
    ? ""
    : JSON.parse(window.localStorage.userLogged);
  useEffect(() => {
    if (!dataUser || dataUser === "") {
      navigate("/");
    }
  }, [dataUser]);

  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-4 ">
        {[...rewards].map((re) => (
          <RewardCard
            key={re.id}
            id={re.id}
            title={re.title}
            image={re.image}
            price={re.price}
            recompenseType={re.recompenseType}
          />
        ))}
      </div>
    </div>
  );
}
