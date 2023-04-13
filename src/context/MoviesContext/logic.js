import { useEffect, useState } from "react";
import { requests } from "../../Requests";
import axios from "axios";

export const useMovies = () => {
  const [showMovieInfosModal, setShowMovieInfosModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
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

  return {
    showMovieInfosModal,
    setShowMovieInfosModal,
    moviesPopular,
    setMoviesPopular,
    moviesTopRated,
    setMoviesTopRated,
    moviesTrending,
    setMoviesTrending,
    selectedMovie,
    setSelectedMovie,
    isLoading,
  };
};
