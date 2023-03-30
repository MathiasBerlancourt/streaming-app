import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";

const Banner = () => {
  const [videoId, setVideoId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const randomPage = Math.floor(Math.random() * 500);
  const [defaultMovie, setDefaultMovie] = useState();
  const [randomMovie, setRandomMovie] = useState();

  useEffect(() => {
    async function fetchdefaultMovie() {
      const responseDefaultMovie = await fetch(
        "https://api.themoviedb.org/3/movie/603692?api_key=d3fe78f96fadbceb0c4b919632104445&language=fr-FR"
      );
      const data = await responseDefaultMovie.json();
      setDefaultMovie(data);
    }

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
      modestbranding: 1,
      loop: 1,
      playlist: videoId,
    },
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <YouTube
            videoId={videoId}
            opts={opts}
            className="absolute top-0 left-0 w-full h-full "
          />
          <div className="absolute inset-0 flex justify-center items-center text-white">
            <h1 className="text-4xl font-bold text-center">
              {videoId === "eA3z_tTBVkc"
                ? defaultMovie.original_title
                : randomMovie.title}
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;
