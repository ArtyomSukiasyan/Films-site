import axios from "axios";


export default async function FetchData (p) {
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=a9b4a343adf7d98ac7614d76c835e0ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${p}&with_watch_monetization_types=flatrate`;
  const response = await axios(apiUrl);
  const data = response.data;
  return data;
};