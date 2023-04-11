import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillLike, AiOutlineClose } from "react-icons/ai";
import { useMoviesContext } from "../context/MoviesContext";

const MovieInfosModal = ({ movie }) => {
  const [detailsMovie, setDetailsMovie] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { setShowMovieInfosModal } = useMoviesContext();
  useEffect(() => {
    const fetchDetailsMovie = async () => {
      if (movie) {
        const responseDetailsMovie = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
        );
        setDetailsMovie(responseDetailsMovie.data);
        setIsLoading(false);
      }
    };
    fetchDetailsMovie();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <span className="text-white">En cours de chargement...</span>;
  } else
    return (
      <div className="fixed flex items-center justify-center z-50 inset-0 overflow-auto  bg-gray-500 bg-opacity-75">
        <article className="bg-black p-6 w-1/2 overflow-hidden h-4/5 rounded-lg shadow transition hover:shadow-lg">
          <button
            onClick={() => {
              return setShowMovieInfosModal(false);
            }}
            className=" pl-[95%] text-gray-400 hover:text-gray-600"
          >
            <AiOutlineClose />
          </button>
          <div className="flex  justify-around">
            {detailsMovie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${detailsMovie.poster_path}`}
                alt={`${detailsMovie.title}`}
                className="w-1/3  object-cover"
              />
            ) : (
              <span className="text-white">No poster available</span>
            )}

            <div className=" text-white p-4 sm:p-6 space-y-2 ">
              <h2 className="mt-0.5 text-left text-xl text-white ">
                {detailsMovie.title}
              </h2>
              <div className="flex flex-col space-y-2  items-start">
                <span className="flex items-center text-green-500">
                  <AiFillLike /> {detailsMovie.vote_average}
                </span>
                <div className="flex font-bold">
                  {detailsMovie.genres &&
                    detailsMovie.genres.map((genre) => (
                      <div
                        key={genre.id}
                        className="block text-left text-xs text-gray-500"
                      >
                        {genre.name}
                        {"\u00A0"}
                      </div>
                    ))}
                </div>
                <div className="block text-left text-xs text-gray-500">
                  <span> Année : {detailsMovie.release_date.substr(0, 4)}</span>{" "}
                  <br />
                  <span>
                    Version originale : {detailsMovie.original_language}
                  </span>
                  <br />
                  <span className="flex">
                    Pistes disponibles :
                    {detailsMovie.spoken_languages.map((language) => (
                      <p>
                        {language.name}
                        {"\u00A0"}{" "}
                      </p>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="mx-8 pt-8 text-sm text-justify leading-relaxed  text-gray-500 ">
            {detailsMovie.overview}
          </p>
        </article>
      </div>
    );
};

export default MovieInfosModal;
