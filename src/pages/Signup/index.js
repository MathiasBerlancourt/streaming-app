import React, { useState } from "react";
import { Link } from "react-router-dom";
import background from "../../assets/img/signupbackground.jpeg";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const { signUp } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("❌ Les mots de passe ne sont pas identiques");
      return; // Stop the submission if passwords do not match
    }
    if (password.length < 6) {
      setErrorMessage("❌ Le mot de passe doit contenir au moins 6 caractères");
      return; // Stop the submission if password is less than 6 characters
    }
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      if (error.message) {
        setErrorMessage(error.message);
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
          className="max-w-[500px] h-[620px] mx-auto bg-black/75 rounded-lg text-white
        "
        >
          <div className="max-w-[320px] mx-20 py-16">
            <h1 className="text-3xl flex justify-center font-bold">
              S'inscrire
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
                autoComplete="current-password"
                required
              />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-lg p-3 my-6 bg-gray-600 "
                type="password"
                autoComplete="confirm-password"
                placeholder="confirmez le mot de passe"
                required
              />
              <button className="bg-red-600 py-3 my-6 rounded-md font-bold ">
                {/* <input type="submit" value="S'inscrire" /> */}S'inscrire
              </button>
              <div className="flex flex-col space-y-2">
                <p className="text-red-600">{errorMessage}</p>
                <div className="flex justify-around items-center text-sm text-gray-600">
                  <p>
                    <input type="checkbox" className="mr-2" />
                    Se souvenir de moi
                  </p>
                  <p>Besoin d'aide ?</p>
                </div>
                <p className="my-2">
                  <span className="text-sm text-gray-600 mr-1">
                    Déjà abonné ?
                  </span>
                  <Link to="/login" className=" text-white-600 font-medium">
                    Se connecter
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

export default Signup;
