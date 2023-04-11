import MovieCard from "./MovieCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useMoviesContext } from "../context/MoviesContext";
import MovieInfosModal from "./MovieInfosModal";

const Main = () => {
  const {
    moviesPopular,
    moviesTopRated,
    moviesTrending,
    showMovieInfosModal,
    setShowMovieInfosModal,
    selectedMovie,
    setSelectedMovie,
  } = useMoviesContext();
  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setShowMovieInfosModal(true);
  };
  return (
    <div className="flex  flex-col ">
      <h1 className="text-white text-2xl my-4 text-left ml-5 text font-bold pt-12 md:pt-0">
        Les plus regardés
      </h1>

      <div className="moviesRow">
        {moviesPopular.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            onClick={() => handleCardClick(movie)}
          />
        ))}
      </div>
      <h1 className="text-white text-2xl my-4 text-left ml-5 text font-bold ">
        Les mieux notés
      </h1>

      <div className="moviesRow">
        {moviesTopRated.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            onClick={() => handleCardClick(movie)}
          />
        ))}
      </div>

      <h1 className="text-white text-2xl my-4 text-left ml-5 text font-bold ">
        Les tendances de la semaine
      </h1>

      <div className="moviesRow">
        {moviesTrending.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            onClick={() => handleCardClick(movie)}
          />
        ))}
      </div>
      {showMovieInfosModal && <MovieInfosModal movie={selectedMovie} />}
    </div>
  );
};

export default Main;
