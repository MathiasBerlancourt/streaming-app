import React from "react";
import { useState } from "react";
import Banner from "../../components/Banner";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <Banner />
      <div></div>
    </div>
  );
};

export default Home;
