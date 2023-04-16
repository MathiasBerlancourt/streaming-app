import React, { useState, useEffect, useMemo } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { BiVolumeMute, BiVolumeFull } from "react-icons/bi";
import { Link } from "react-router-dom";
import MovieInfosModal from "./MovieInfosModal";
import { useMoviesContext } from "../context/MoviesContext";

const Banner = () => {
  let [videoId, setVideoId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    showMovieInfosModal,
    setShowMovieInfosModal,
    selectedMovie,
    setSelectedMovie,
    isLoadingMovies,
  } = useMoviesContext();
  const [movie, setMovie] = useState();
  const [mute, setMute] = useState(1);
  const [opts, setOpts] = useState({
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: mute,
      controls: 0,
      showinfo: 0,
      modestbranding: 0,
      enablejsapi: 1,
      loop: true,
      fs: 0,
      iv_load_policy: 3,
    },
  });
  const handleInfosClick = (movie) => {
    setSelectedMovie(movie);
    setShowMovieInfosModal(true);
  };
  const handleMuteButton = () => {
    setOpts({
      ...opts,
      playerVars: {
        ...opts.playerVars,
        mute: mute === 1 ? 0 : 1,
      },
    });
    setMute(mute === 1 ? 0 : 1);
  };

  const loader = useMemo(() => {
    if (isLoading || isLoadingMovies) {
      return true;
    } else {
      return false;
    }
  }, [isLoading, isLoadingMovies]);

  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 500);
    const fetchMovie = async () => {
      try {
        const {
          data: { results },
        } = await axios.get("https://api.themoviedb.org/3/movie/popular", {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "fr-FR",
            page: randomPage,
          },
        });

        const randomMovie = results[Math.floor(Math.random() * results.length)];

        const {
          data: { results: videos },
        } = await axios.get(
          `https://api.themoviedb.org/3/movie/${randomMovie.id}/videos`,
          {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              language: "fr-FR",
            },
          }
        );

        const video = videos[Math.floor(Math.random() * videos.length)];
        if (video) {
          setVideoId(video.key);
        }
        setMovie(randomMovie);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {loader ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="">
          {videoId ? (
            <YouTube
              videoId={videoId}
              opts={opts}
              className="absolute top-0 left-0 w-full  h-full "
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              className="w-full  h-full "
              alt="bannermovie"
            />
          )}

          <div className="absolute left-36 top-1/4 flex-column  ">
            <h1 className="text-6xl font-extrabold text-left text-white">
              {movie.title}
            </h1>
            <p className="text-white text-xl font-bold text-justify w-2/3 line-clamp-5">
              {movie.overview}
            </p>
            <div className="flex justify-between align-center">
              <div className="flex space-x-6 pt-8">
                {videoId && (
                  <Link
                    to={`https://youtube.com/embed/${videoId}?fs=1&autoplay=1`}
                    target="_blank"
                  >
                    <button className="flex h-12 space-x-4 w-48 items-center border border-white py-2 px-4 rounded-md">
                      <FaPlay style={{ color: "white", fontSize: "20px" }} />
                      <span className="text-white ">Bande Annonce</span>
                    </button>
                  </Link>
                )}

                <button
                  onClick={() => handleInfosClick(movie)}
                  className="flex h-12 space-x-4 w-48 items-center border border-white py-2 px-4 rounded-md"
                >
                  <AiOutlineInfoCircle
                    style={{ color: "white", fontSize: "30px" }}
                  />
                  <span className="text-white ">Plus d'Infos</span>
                </button>
              </div>
              {videoId && (
                <div className="absolute left-[90%]">
                  <button className="pr-24" onClick={handleMuteButton}>
                    {mute === 1 ? (
                      <BiVolumeMute
                        style={{ color: "white", fontSize: "40px" }}
                      />
                    ) : (
                      <BiVolumeFull
                        style={{ color: "white", fontSize: "40px" }}
                      />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {showMovieInfosModal && <MovieInfosModal movie={selectedMovie} />}
    </div>
  );
};

export default Banner;
