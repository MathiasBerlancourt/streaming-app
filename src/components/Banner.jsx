import React, { useState } from "react";
import YouTube from "react-youtube";
import { useEffect } from "react";
import { api_key, requests, randomPage } from "../Requests";
import axios from "axios";

const Banner = () => {
  const videoId = "Wp3EE71PINI";
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [isLoadingRandomTrailer, setLoadingRandomTrailer] = useState(true);
  const [movies, setMovies] = useState();
  const [randomTrailer, setRandomTrailer] = useState();
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      mute: 1,
      playlist: videoId,
    },
  };

  useEffect(() => {
    const requestMovies = async () => {
      const responseMovies = await axios.get(
        `${requests.requestTrending}&page=${randomPage}`
      );
      setMovies(responseMovies.data.results);
      setIsLoadingMovies(false);
    };
    requestMovies();
    console.log("movies:", movies);
  }, []);

  useEffect(() => {
    if (movies) {
      const randomMovieId = getRandomMovie(movies);
      const fetchRandomTrailer = async () => {
        try {
          const responseRandomTrailer = await axios.get(
            `https://api.themoviedb.org/3/movie/${randomMovieId}/videos?api_key=${api_key}&language=fr-FR`
          );
          setLoadingRandomTrailer(false);
          setRandomTrailer(responseRandomTrailer.data);
        } catch (error) {
          console.log("error:", error.message);
        }
      };
      fetchRandomTrailer();
      console.log("randomTrailer:", randomTrailer);
    }
  }, []);

  const getRandomMovie = (movies) => {
    const index = Math.floor(Math.random() * movies.length);
    return movies[index].id;
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="relative w-full h-full ">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={(event) => event.target.playVideo()}
          className="absolute top-0 left-0 w-full h-full "
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Titre de la vidéo</h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
