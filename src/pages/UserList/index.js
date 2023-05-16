import SavedMovies from "../../components/SavedMovies";

const UserList = () => {
  return (
    <div>
      <h1 className="text-3xl pt-16 pl-4 text-[#717171] md:text-5xl font-bold">
        Ma liste de films
      </h1>
      <SavedMovies />
    </div>
  );
};

export default UserList;
