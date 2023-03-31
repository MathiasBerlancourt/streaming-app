import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { BiVolumeMute, BiVolumeFull } from "react-icons/bi";

const Banner = () => {
  const [videoId, setVideoId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const randomPage = Math.floor(Math.random() * 500);
  const [defaultMovie, setDefaultMovie] = useState();
  const [randomMovie, setRandomMovie] = useState();

  useEffect(() => {
    const fetchdefaultMovie = async () => {
      const responseDefaultMovie = await fetch(
        "https://api.themoviedb.org/3/movie/603692?api_key=d3fe78f96fadbceb0c4b919632104445&language=fr-FR"
      );
      const data = await responseDefaultMovie.json();
      setDefaultMovie(data);
    };

    fetchdefaultMovie();
    console.log("defaultMovie:", defaultMovie);
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const {
          data: { results },
        } = await axios.get("https://api.themoviedb.org/3/movie/popular", {
          params: {
            api_key: "d3fe78f96fadbceb0c4b919632104445",
            language: "fr-FR",
            page: randomPage,
          },
        });

        const movie = results[Math.floor(Math.random() * results.length)];

        const {
          data: { results: videos },
        } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          {
            params: {
              api_key: "d3fe78f96fadbceb0c4b919632104445",
              language: "fr-FR",
            },
          }
        );

        const video = videos[Math.floor(Math.random() * videos.length)];
        if (video) {
          setVideoId(video.key);
          setIsLoading(false);
        } else {
          setVideoId("eA3z_tTBVkc");
          setIsLoading(false);
        }
        setRandomMovie(movie);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, []);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 0,
      enablejsapi: 1,
      loop: 0,
      fs: 0,
      iv_load_policy: 3,
      // playlist: videoId,
    },
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <YouTube
            videoId={videoId}
            loop={1}
            opts={opts}
            className="absolute top-0 left-0 w-full  h-full "
          />
          <div className="absolute left-36 top-1/4 flex-column  ">
            <h1 className="text-6xl font-extrabold text-left text-white">
              {videoId === "eA3z_tTBVkc"
                ? defaultMovie.original_title
                : randomMovie.title}
            </h1>
            <p className="text-white text-xl font-bold text-justify w-2/3">
              {randomMovie.overview}
            </p>
            <div className="flex justify-between align-center">
              <div className="flex space-x-6 pt-8">
                <button className="flex space-x-4 w-48 items-center border border-white py-2 px-4 rounded-md">
                  <FaPlay style={{ color: "white", fontSize: "20px" }} />
                  <span className="text-white ">Lecture</span>
                </button>
                <button className="flex space-x-4 w-48 items-center border border-white py-2 px-4 rounded-md">
                  <AiOutlineInfoCircle
                    style={{ color: "white", fontSize: "30px" }}
                  />
                  <span className="text-white ">Plus d'Infos</span>
                </button>
              </div>
              <div>
                <button className="pr-24">
                  <BiVolumeMute style={{ color: "white", fontSize: "40px" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
