import React from "react";
import { AiFillLike } from "react-icons/ai";
import { BsPlusCircle, BsCheckLg } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { useMovieCard } from "./logic";
import { MoviesProvider } from "./context";

const MovieCard = ({ movie, onClick }) => {
  const useMovies = useMovieCard({ movie });

  return (
    <MoviesProvider {...useMovies}>
      <div
        className="
      text-transparent 
      relative 
      flex-none 
      w-80  
      mx-1 
      rounded-lg  
      object-cover 
      shadow-md 
      transition 
      duration-500 
      ease-in-out 
      transform 
      hover:scale-125 
      hover:z-30  
      hover:text-white
    "
      >
        {movie.backdrop_path ? (
          <img
            onClick={onClick}
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
        <div
          onClick={useMovies.saveMovie}
          className="absolute text-xl right-10 bottom-6"
        >
          {useMovies.like ? <BsPlusCircle /> : <BsCheckLg />}
        </div>
      </div>
    </MoviesProvider>
  );
};

export default MovieCard;
