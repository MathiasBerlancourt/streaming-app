import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useMoviesContext } from "../context/MoviesContext";
import { doc, onSnapshot } from "firebase/firestore";
const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const {
    setShowMovieInfosModal,

    setSelectedMovie,
  } = useMoviesContext();
  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setShowMovieInfosModal(true);
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);
  return (
    <div className="moviesRow">
      {movies?.map((movie) => (
        <div
          className="  text-transparent relative flex-none w-80  mx-1 rounded-lg  object-cover shadow-md transition duration-500 ease-in-out transform hover:scale-125 hover:z-30  hover:text-white
      "
        >
          {movie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={`${movie.title}`}
            />
          ) : (
            <span className="text-white">No poster available</span>
          )}

          <div className="absolute bottom-4 left-10">
            <h2>{movie.title}</h2>
            <div className="flex items-center ">
              <AiFillLike /> <p>{movie.vote_average}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedMovies;
