import React, { useEffect } from "react";
import { getRewards } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import RewardCard from "../components/RewardCard";
import NavBar from "../components/NavBar";
// import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function Reward() {
  const dispatch = useDispatch();
  const rewards = useSelector((state) => state.rewards);
  const { isAuthenticated } = useAuth0();
  const navigate= useNavigate()
  
  useEffect(() => {
    dispatch(getRewards());
  }, [dispatch]);
  
  const dataUser = !window.localStorage.userLogged ? "" : JSON.parse(window.localStorage.userLogged);
  useEffect(()=>{
    if(!dataUser || dataUser===""){
      navigate("/")
    }
  },[dataUser])


  return (
      <div>
        <div>
          <NavBar />
        </div>
        <div className="flex flex-row">
          {[...rewards].map((re) => (
            <RewardCard
              id={re.id}
              title={re.title}
              image={re.image}
              price={re.price}
              recompenseType={re.recompenseType}
            />
          ))}
        </div>
      </div>
    )
  
}
