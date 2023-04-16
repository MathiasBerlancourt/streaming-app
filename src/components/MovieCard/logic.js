import { useState } from "react";
import { db } from "../../firebase";
import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { RiMovie2Fill } from "react-icons/ri";
import { IoTrashBinSharp } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { UserAuth } from "../../context/AuthContext";

export const useMovieCard = ({ movie }) => {
  const { user } = UserAuth();
  const [like, setLike] = useState(false);
  const movieId = doc(db, `users`, `${user?.email}`);

  const addMovieNotify = () =>
    toast.success(
      `${movie.title} a été ajouté à votre liste !`,
      { icon: RiMovie2Fill },
      { toastId: movie.id }
    );

  const removeMovieNotify = () =>
    toast.info(
      `${movie.title} a été retiré de votre liste ! `,
      { icon: IoTrashBinSharp },
      { toastId: movie.id }
    );

  const messageCreateAccountNotify = () => {
    toast.error(
      "Vous devez vous connecter ou créer un compte pour ajouter un film à vos favoris",
      { icon: GrClose },
      {
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  const saveMovie = async () => {
    if (user) {
      if (like) {
        await updateDoc(movieId, {
          savedMovies: arrayRemove({
            id: movie.id,
            title: movie.title,
            backdrop_path: movie.backdrop_path,
            vote_average: movie.vote_average,
          }),
        });
        setLike(true);
        removeMovieNotify();
      } else {
        await updateDoc(movieId, {
          savedMovies: arrayUnion({
            id: movie.id,
            title: movie.title,
            backdrop_path: movie.backdrop_path,
            vote_average: movie.vote_average,
          }),
        });
        setLike(false);
        addMovieNotify();
      }
    } else {
      // if user is not logged in
      messageCreateAccountNotify();
    }
  };

  return { saveMovie, like, setLike };
};
