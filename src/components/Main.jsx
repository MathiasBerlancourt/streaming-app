import axios from "axios";
import { useEffect, useState } from "react";
import { requests } from "../Requests";
import MovieCard from "./MovieCard";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Main = () => {
  const [movies, setMovies] = useState();
  const [movieBanner, setMovieBanner] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const responsePopularMovies = await axios.get(requests.requestPopular);
        setMovies(responsePopularMovies.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    getMovies();
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
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
};

export default Main;
