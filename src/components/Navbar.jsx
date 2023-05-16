import React from "react";
import { Link } from "react-router-dom";
import matflex from "../assets/img/matflexLogo.png";
import mobileLogo from "../assets/img/logoMobile.png";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { RiAccountCircleFill } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logOut } = UserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-between p-4 z-40 w-full absolute">
      <Link to="/">
        <img className="h-12 hidden md:block " src={matflex} alt="logo" />
        <img
          className="h-12 block object-contain md:hidden"
          src={mobileLogo}
          alt="mobile-logo"
        />
      </Link>
      {user?.email ? (
        <div className="flex gap-2">
          <Link to="/mylist">
            <button className="text-white h-8 hidden md:block  items-center hover:border border-white px-6 py-1 rounded cursor-pointer ">
              Ma Liste
            </button>
            <button className="block md:hidden ml-8items-center ">
              <AiFillStar className="text-white text-3xl  " />
            </button>
          </Link>
          <Link to="/account">
            <button className="text-white h-8 hidden md:block  items-center hover:border border-white px-6 py-1 rounded cursor-pointer ">
              Mon Compte
            </button>
            <button className="block md:hidden ">
              <RiAccountCircleFill className="text-white text-3xl ml-8" />
            </button>
          </Link>

          <button
            onClick={handleLogOut}
            className="bg-red-600 h-8  hidden md:block items-center px-6 rounded cursor-pointer text-white"
          >
            se déconnecter
          </button>
          <button
            onClick={handleLogOut}
            className="block md:hidden items-center "
          >
            <FiLogOut className="text-red-600 text-3xl ml-8" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link to="/login">
            <button className="text-white h-8 flex items-center hover:border border-white px-6 py-1 rounded cursor-pointer ">
              Connexion
            </button>
          </Link>

          <Link to="/signup">
            <button className="bg-red-600 h-8 flex items-center px-6 py-2 rounded cursor-pointer text-white">
              Inscription
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
