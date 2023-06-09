import { createContext, useContext } from "react";
import { useMovies } from "./logic";

export const MoviesContext = createContext({});

export const MoviesProvider = ({ children }) => {
  const {
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
    isLoadingMovies,
  } = useMovies();

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
        selectedMovie,
        setSelectedMovie,
        isLoadingMovies,
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
