import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { BiVolumeMute, BiVolumeFull } from "react-icons/bi";
import { Link } from "react-router-dom";

const Banner = () => {
  let [videoId, setVideoId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [defaultMovie, setDefaultMovie] = useState();
  const [randomMovie, setRandomMovie] = useState();
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
  // const opts = useRef({
  //   height: "100%",
  //   width: "100%",
  //   playerVars: {
  //     autoplay: 1,
  //     mute: mute,
  //     controls: 0,
  //     showinfo: 0,
  //     modestbranding: 0,
  //     enablejsapi: 1,
  //     loop: true,
  //     fs: 0,
  //     iv_load_policy: 3,
  //     // playlist: videoId,
  //   },
  // });

  // const handleMuteButton = () => {
  //   mute.current ? (mute.current = false) : (mute.current = true);
  // };
  // const handleMuteButton = () => {
  //   mute === 1 ? setMute(0) : setMute(1);
  // };
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
  useEffect(() => {
    const fetchdefaultMovie = async () => {
      const responseDefaultMovie = await fetch(
        ` https://api.themoviedb.org/3/movie/603692?api_key=${process.env.REACT_APP_API_KEY}&language=fr-FR`
      );
      const data = await responseDefaultMovie.json();
      setDefaultMovie(data);
    };

    fetchdefaultMovie();
    console.log("defaultMovie:", defaultMovie);
  }, [defaultMovie]);

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

        const movie = results[Math.floor(Math.random() * results.length)];

        const {
          data: { results: videos },
        } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
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

  // const opts = {
  //   height: "100%",
  //   width: "100%",
  //   playerVars: {
  //     autoplay: 1,
  //     mute: mute,
  //     controls: 0,
  //     showinfo: 0,
  //     modestbranding: 0,
  //     enablejsapi: 1,
  //     loop: true,
  //     fs: 0,
  //     iv_load_policy: 3,
  //     // playlist: videoId,
  //   },
  // };

  //opts.playerVars.mute=0
  // useEffect(() => {
  //   opts.current.playerVars.mute = mute;
  // }, [mute]);
  return (
    <div className="relative h-screen overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          {console.log("j'ai re render")}
          <YouTube
            videoId={videoId}
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
              {videoId === "eA3z_tTBVkc"
                ? defaultMovie.overview
                : randomMovie.overview}
            </p>
            <div className="flex justify-between align-center">
              <div className="flex space-x-6 pt-8">
                <Link
                  to={`https://youtube.com/embed/${videoId}?fs=1&autoplay=1`}
                  target="_blank"
                >
                  <button className="flex h-12 space-x-4 w-48 items-center border border-white py-2 px-4 rounded-md">
                    <FaPlay style={{ color: "white", fontSize: "20px" }} />
                    <span className="text-white ">Bande Annonce</span>
                  </button>
                </Link>
                <Link>
                  <button className="flex h-12 space-x-4 w-48 items-center border border-white py-2 px-4 rounded-md">
                    <AiOutlineInfoCircle
                      style={{ color: "white", fontSize: "30px" }}
                    />
                    <span className="text-white ">Plus d'Infos</span>
                  </button>
                </Link>
              </div>
              <div>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
