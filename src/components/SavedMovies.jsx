import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";

import { doc, onSnapshot } from "firebase/firestore";
import { BsFillTrash3Fill } from "react-icons/bs";
import { toast } from "react-toastify";
import { IoTrashBinSharp } from "react-icons/io5";
import { arrayRemove, updateDoc } from "firebase/firestore";

const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const removeMovieNotify = (movie) =>
    toast.info(
      `${movie?.title} a été retiré de votre liste ! `,
      { icon: IoTrashBinSharp },
      { toastId: movie?.id }
    );

  const removeMovie = async (movie) => {
    try {
      await updateDoc(doc(db, "users", `${user?.email}`), {
        savedMovies: arrayRemove({
          id: movie.id,
          title: movie.title,
          backdrop_path: movie.backdrop_path,
          vote_average: movie.vote_average,
        }),
      });
      removeMovieNotify(movie);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);
  return (
    <div className="moviesRow">
      {movies?.map((movie) => (
        <div
          key={movie.id}
          className="  text-transparent relative flex-none w-80  mx-1 rounded-lg  object-cover shadow-md transition duration-500 ease-in-out transform hover:scale-125 hover:z-30  hover:text-white
      "
        >
          {movie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={`${movie.title}`}
            />
          ) : (
            <span className="text-white">No poster available</span>
          )}
          <BsFillTrash3Fill
            onClick={() => removeMovie(movie)}
            className="absolute bottom-[50%] right-5 text-xl "
          />
          <div className="absolute bottom-4 left-10">
            <h2>{movie.title}</h2>

            <div className="flex items-center ">
              <AiFillLike /> <p>{movie.vote_average}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedMovies;
