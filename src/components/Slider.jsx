import React, { useState } from "react";

const gamesSlider = [
  {
    id: 3498,
    name: "Grand Theft Auto V",
    img: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
  },
  {
    id: 3328,
    name: "The Witcher 3: Wild Hunt",
    img: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
  },
  {
    id: 4291,
    name: "Counter-Strike: Global Offensive",
    img: "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg",
  },
  {
    id: 5679,
    name: "The Elder Scrolls V: Skyrim",
    img: "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg",
  }
]


export default function Slider() {
  const [game, setGame] = useState(Math.floor(Math.random()*4));

  return (
    <div className="container mt-5">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        <div className="ease-in-out" key={gamesSlider[game].id}>
          <img src={gamesSlider[game].img} className="absolute block object-cover w-full" alt={gamesSlider[game].name} />
        </div>
      </div>
    </div>
  )
}