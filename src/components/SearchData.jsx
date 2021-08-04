import axios from "axios";

export default async function SearchData (p, search)  {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=a9b4a343adf7d98ac7614d76c835e0ea&language=en-US&query=${search}&page=${p}&include_adult=false`;
  const response = await axios(apiUrl);
  const data = response.data;
  return data;
};