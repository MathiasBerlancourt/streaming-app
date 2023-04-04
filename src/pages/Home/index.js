import React from "react";
import { useState } from "react";
import Banner from "../../components/Banner";
import Main from "../../components/Main";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <Banner />
      <Main />
    </div>
  );
};

export default Home;
