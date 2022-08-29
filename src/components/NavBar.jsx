import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";

export default function NavBar() {
    const dataUser = !window.localStorage.userLogged ? "" : JSON.parse(window.localStorage.userLogged);
    
    return (
    <nav className="bg-gray-800 shadow">
      <div className="container px-6 py-4 mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-700">
              <a
                className="text-2xl font-bold text-gray-800 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                href="/home"
              >
                Play Center
              </a>
            </div>
            <div className="flex md:hidden">
              <button
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-1 md:flex md:items-center md:justify-between">
            <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">
              <Link
                to={'/games'}
                className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                Games
              </Link>
              <Link
                to={'/forum'}
                className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                Forum
              </Link>
              <Link
                to="/rewards"
                className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                Rewards
              </Link>
              <Link
                to="/about"
                className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                Contact
              </Link>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
                  <div className="flex flex-col items-end mx-3">
                    <h3 className="max-w-2xl text-2xl text-white">{dataUser.nickname}</h3>
                    <span className="text-xs text-gray-900 dark:text-white">💰 {dataUser.coins}</span>
                  </div>
                  <Link to={ `/profile/${ dataUser.id }` }>
                    <div className="w-16 h-16 overflow-hidden border-2 border-gray-400 rounded-full">
                      <img
                          src={ dataUser.img }
                          className="object-cover w-full h-full"
                          alt="avatar"
                      />
                    </div>
                  </Link>
                  <div>
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
    )
}