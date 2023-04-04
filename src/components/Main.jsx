import axios from "axios";
import { useEffect, useState } from "react";
import { requests } from "../Requests";
import MovieCard from "./MovieCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Main = () => {
  const [moviesPopular, setMoviesPopular] = useState();
  const [moviesTopRated, setMoviesTopRated] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [moviesTrending, setMoviesTrending] = useState();

  useEffect(() => {
    const getmoviesPopular = async () => {
      try {
        const responsePopularmoviesPopular = await axios.get(
          requests.requestPopular
        );
        const responseRequestTopRated = await axios.get(
          requests.requestTopRated
        );
        const responseRequestTrending = await axios.get(
          requests.requestTrending
        );
        setMoviesPopular(responsePopularmoviesPopular.data.results);
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
      <div className="flex  flex-col ">
        <h1 className="text-white text-2xl my-4 text-left ml-5 text font-bold ">
          Les plus regardés
        </h1>

        <div className="flex flex-nowrap overflow-hidden overflow-x-scroll scrolling-touch mx-4 ">
          {moviesPopular.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
        <h1 className="text-white text-2xl my-4 text-left ml-5 text font-bold ">
          Les mieux notés
        </h1>

        <div className="flex flex-nowrap overflow-hidden overflow-x-scroll scrolling-touch mx-4 ">
          {moviesTopRated.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>

        <h1 className="text-white text-2xl my-4 text-left ml-5 text font-bold ">
          Les tendances de la semaine
        </h1>

        <div className="flex flex-nowrap overflow-hidden overflow-x-scroll scrolling-touch mx-4 ">
          {moviesTrending.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
};

export default Main;
