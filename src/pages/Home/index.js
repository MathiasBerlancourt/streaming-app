import React from "react";
import Banner from "../../components/Banner";
import Main from "../../components/Main";

import { useState } from "react";

//context
import MoviesProvider from "../../context/MoviesContext";

const Home = () => {
  const [showMovieInfosModal, setShowMovieInfosModal] = useState(false);

  return (
    <div>
      <MoviesProvider>
        <div className="hidden md:block">
          <Banner
            showMovieInfosModal={showMovieInfosModal}
            setShowMovieInfosModal={setShowMovieInfosModal}
          />
        </div>
        <Main />
      </MoviesProvider>
    </div>
  );
};

export default Home;
