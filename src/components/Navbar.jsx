import React from "react";
import { Link } from "react-router-dom";
import matflex from "../assets/img/matflexLogo.png";
import mobileLogo from "../assets/img/logoMobile.png";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 z-40 w-full absolute">
      <Link to="/">
        <img className="h-12 hidden md:block " src={matflex} alt="logo" />
        <img
          className="h-12 block md:hidden"
          src={mobileLogo}
          alt="mobile-logo"
        />
      </Link>

      <div className="flex gap-2">
        <Link to="/login">
          <button className="text-white  hover:border border-white px-6 py-1 rounded cursor-pointer ">
            Sign In
          </button>
        </Link>

        <Link to="/signup">
          <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
