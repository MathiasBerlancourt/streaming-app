import React from "react";
import matflex from "../assets/img/matflexLogo.png";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 z-40 w-full absolute">
      {/* <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
        MATFLEX
      </h1> */}
      <img className="h-12" src={matflex} alt="logo" />
      <div className="flex gap-2">
        <button className="text-white  hover:border border-white px-6 py-1 rounded cursor-pointer ">
          Sign In
        </button>
        <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
