import { createContext, useContext, useMemo } from "react";

const initialState = {
  like: false,
  setLike: () => undefined,
  saveMovie: () => undefined,
};

export const context = createContext(initialState);

export const MoviesContext = () => useContext(context);

export const MoviesProvider = ({ children, ...props }) => {
  const value = useMemo(
    () => ({
      ...initialState,
      ...props,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.like, props.setLike, props.saveMovie]
  );
  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};
