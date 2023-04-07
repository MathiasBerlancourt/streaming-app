import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import background from "../../assets/img/signupbackground.jpeg";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
const Login = () => {
  const { logIn } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);

      navigate("/");
      console.log("submit ok ");
    } catch (error) {
      console.log(error);
      if (error.message) {
        setErrorMessage("l'email renseigné ou le mot de passe est incorrecte");
      }
    }
  };
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
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col  py-5"
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg p-3 my-6 bg-gray-600 "
                type="email"
                placeholder="email"
                autoComplete="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg p-3 my-6 bg-gray-600 "
                type="password"
                placeholder="mot de passe"
                autoComplete="password"
                required
              />

              <button
                onClick={handleSubmit}
                className="bg-red-600 py-3 my-6 rounded-md font-bold "
              >
                Se connecter
              </button>
              <div className="flex flex-col space-y-4">
                <div className="text-red-600">{errorMessage}</div>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
