import axios from "axios";
import { useEffect, useState } from "react";
import { requests } from "../Requests";

const Main = () => {
  const [movies, setMovies] = useState();
  const [movieBanner, setMovieBanner] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const responsePopularMovies = await axios.get(requests.requestPopular);
        setMovies(responsePopularMovies.data.results);
        setMovieBanner(movies[Math.floor(Math.random() * movies.length)]);
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
      <div className="w-full h-[550px] text-white">
        <div className="w-full h-full">
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${movieBanner.backdrop_path}`}
            alt={`${movieBanner.title}`}
          />
        </div>
      </div>
    );
};

export default Main;
