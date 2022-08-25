import React, { useEffect } from "react";
import { getRewards } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import RewardCard from "../components/RewardCard";
import NavBar from "../components/NavBar";
// import { useState } from 'react';

export default function Reward() {
  const dispatch = useDispatch();
  const rewards = useSelector((state) => state.rewards);

  useEffect(() => {
    dispatch(getRewards());
  }, []);

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
  );
}
