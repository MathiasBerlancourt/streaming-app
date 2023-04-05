import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";

const MovieInfosModal = ({
  setShowMovieInfosModal,
  defaultMovie,
  randomMovie,
}) => {
  const [detailsMovie, setDetailsMovie] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchDetailsMovie = async () => {
      if (randomMovie) {
        const responseDetailsMovie = await axios.get(
          `https://api.themoviedb.org/3/movie/${randomMovie.id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
        );
        setDetailsMovie(responseDetailsMovie.data);
        setIsLoading(false);
      } else {
        const responseDetailsMovie = await axios.get(
          `https://api.themoviedb.org/3/movie/${defaultMovie.id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
        );
        setDetailsMovie(responseDetailsMovie.data);
        setIsLoading(false);
      }
    };
    fetchDetailsMovie();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <span>En cours de chargement...</span>;
  } else
    return (
      <div className="fixed flex justify-center z-50 inset-0 overflow-auto  bg-gray-500 bg-opacity-75">
        <article className="bg-black  p-6 w-1/2  overflow-hidden h-3/4 rounded-lg shadow transition hover:shadow-lg">
          <button
            onClick={() => {
              return setShowMovieInfosModal(false);
            }}
            className=" flex m-3 text-gray-700 hover:text-gray-600"
          >
            X
          </button>
          <div className="flex justify-evenly">
            <img
              src={`https://image.tmdb.org/t/p/original/${detailsMovie.poster_path}`}
              alt={`${detailsMovie.title}`}
              className="w-1/3  object-cover"
            />

            <div className=" text-white p-4 sm:p-6">
              <h2 className="mt-0.5 text-xl text-white ">
                {detailsMovie.title}
              </h2>
              <div className="flex flex-col items-start">
                <span className="flex items-center text-green-500">
                  <AiFillLike /> {detailsMovie.vote_average}
                </span>
                <p className="block text-xs text-gray-500">
                  Année : {detailsMovie.release_date.substr(0, 4)}
                </p>
              </div>
            </div>
          </div>
          <p className="mx-8 text-sm text-left leading-relaxed  text-gray-500 ">
            {detailsMovie.overview}
          </p>
        </article>
      </div>
    );
};

export default MovieInfosModal;
