export const api_key = "d3fe78f96fadbceb0c4b919632104445";

export const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=fr-FR&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=fr-FR&page=1`,
  requestTrending: `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&include_video=true`,
  requestMovie: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=fr-FR&page=1&include_adult=false`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=fr-FR&page=1`,
};

// export const randomMovie = (array) => {
//   const idList = [];
//   array.map((movie) => {
//     idList.push(movie.id);
//     return idList;
//   });
//   let randomIndex = Math.floor(Math.random() * idList.length);
//   let randomValue = idList[randomIndex];
//   return randomValue;
// };
