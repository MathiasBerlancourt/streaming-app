import React from "react";
import background from "../../assets/img/signupbackground.jpeg";

const Signup = () => {
  return (
    <div className="w-full h-screen">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src={background}
        alt="signupBackground"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-24 z-30"></div>
    </div>
  );
};

export default Signup;
