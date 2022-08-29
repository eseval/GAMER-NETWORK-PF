import React from "react";
import { Link } from "react-router-dom";

export default function RewardCard({
                                     id,
                                     title,
                                     image,
                                     price,
                                     recompenseType,
                                   }) {
  return (
      <div className="p-4">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 min-h-570px">
          <a href={ `/rewards/${ id }` }>
            <img
                className="p-8 rounded-t-lg h-80 w-80"
                src={ image }
                alt="product image"
            />
          </a>
          <div className="px-5 pb-5">
            <a href={ `/rewards/${ id }` }>
              <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                { title }
              </h3>
            </a>
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                { recompenseType }
              </h5>
            </a>
            <div className="flex justify-between items-center">
              <Link to={ `/rewards/${ id }` }>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                💰 { price } Coins
              </span>
                <br/>
                <br/>
                <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Claim
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
