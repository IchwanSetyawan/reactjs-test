import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const username = localStorage.getItem("username");
  return (
    <header>
      <nav className="bg-primary border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div onClick={() => navigate("/users")} className="cursor-pointer">
            <h3 className="font-bold text-white ">
              Welcome, {username.toLocaleUpperCase()}
            </h3>
          </div>
          <div className="flex items-center lg:order-2">
            <button
              onClick={handleLogout}
              className="text-white bg-red-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
