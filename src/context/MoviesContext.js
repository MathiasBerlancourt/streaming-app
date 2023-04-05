import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { requests } from "../Requests";
export const MoviesContext = createContext({});

export const MoviesProvider = ({ children }) => {
  const [showMovieInfosModal, setShowMovieInfosModal] = useState(false);
  const [moviesPopular, setMoviesPopular] = useState([]);
  const [moviesTopRated, setMoviesTopRated] = useState([]);
  const [moviesTrending, setMoviesTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getmoviesPopular = async () => {
      try {
        const responsePopularmovies = await axios.get(requests.requestPopular);
        const responseRequestTopRated = await axios.get(
          requests.requestTopRated
        );
        const responseRequestTrending = await axios.get(
          requests.requestTrending
        );
        setMoviesPopular(responsePopularmovies.data.results);
        setMoviesTopRated(responseRequestTopRated.data.results);
        setMoviesTrending(responseRequestTrending.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    getmoviesPopular();
  }, []);
  if (isLoading) {
    return <span>En cours de chargement...</span>;
  } else
    return (
      <MoviesContext.Provider
        value={{
          showMovieInfosModal,
          setShowMovieInfosModal,
          moviesPopular,
          setMoviesPopular,
          moviesTopRated,
          setMoviesTopRated,
          moviesTrending,
          setMoviesTrending,
        }}
      >
        {children}
      </MoviesContext.Provider>
    );
};

export default MoviesProvider;

export const useMoviesContext = () => {
  return useContext(MoviesContext);
};
