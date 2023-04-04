import React from "react";
import { AiFillLike } from "react-icons/ai";

const MovieCard = ({ movie }) => {
  return (
    <div
      className="  text-transparent relative flex-none w-80  mx-1 rounded-lg  object-cover shadow-md transition duration-500 ease-in-out transform hover:scale-125 hover:z-30  hover:text-white
    "
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={`${movie.title}`}
      />
      <div className="absolute bottom-4 left-10">
        <h2>{movie.title}</h2>
        <div className="flex items-center">
          <AiFillLike /> <p>{movie.vote_average}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
