import React from "react";
import { Link } from "react-router-dom";
import background from "../../assets/img/signupbackground.jpeg";

const Login = () => {
  return (
    <div className="w-full h-screen">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src={background}
        alt="signupBackground"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-30">
        <div
          className="max-w-[500px] h-[600px] mx-auto bg-black/75 rounded-lg text-white
    "
        >
          <div className="max-w-[320px] mx-20 py-16">
            <h1 className="text-3xl flex justify-center font-bold">
              Se connecter
            </h1>
            <form className="w-full flex flex-col  py-5">
              <input
                className="rounded-lg p-3 my-6 bg-gray-600 "
                type="email"
                placeholder="email"
                autoComplete="email"
              />
              <input
                className="rounded-lg p-3 my-6 bg-gray-600 "
                type="password"
                placeholder="mot de passe"
                autoComplete="password"
                required
              />

              <button className="bg-red-600 py-3 my-6 rounded-md font-bold ">
                Se connecter
              </button>
              <div className="flex justify-around items-center text-sm text-gray-600">
                <p>
                  <input type="checkbox" className="mr-2" />
                  Se souvenir de moi
                </p>
                <p>Besoin d'aide ?</p>
              </div>
              <p className="py-4">
                <span className="text-sm mr-1 text-gray-600">
                  Première visite sur Matflex ?
                </span>
                <Link to="/signup" className=" text-white-600 font-medium">
                  Inscrivez-vous
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
