import { useEffect, useMemo, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Films from "./Films";
import axios from "axios";

const fetchData = async (p) => {
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=a9b4a343adf7d98ac7614d76c835e0ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${p}&with_watch_monetization_types=flatrate`;
  let response = await axios(apiUrl);
  let data = response.data;
  return data;
};

const searchData = async (p, search) => {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=a9b4a343adf7d98ac7614d76c835e0ea&language=en-US&query=${search}&page=${p}&include_adult=false`;
  let response = await axios(apiUrl);
  let data = response.data;
  return data;
};

export default function General() {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filmInfo, setFilmInfo] = useState();
  let history = useHistory();

  const getData = useMemo(
    () => (searchValue ? searchData : fetchData),
    [searchValue]
  );

  const scrollHandler = (event) => {
    if (
      event.target.documentElement.scrollHeight ===
      event.target.documentElement.scrollTop + window.innerHeight
    ) {
      setPage((p) => p + 1);
    }
  };

  useEffect(() => {
    getData(page, searchValue).then((data) => {
      setState((s) => [...s, ...data.results]);
    });
  }, [getData, page, searchValue]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);

  function handleChange(value) {
    setSearchValue(value);
    setState([]);
  }

  function handleClickInfo(idd) {
    history.push(`/films/${idd}`);
    const apiUrl = `https://api.themoviedb.org/3/movie/${idd}?api_key=a9b4a343adf7d98ac7614d76c835e0ea&language=en-US`;
    axios({
      method: "GET",
      url: apiUrl,
    })
      .then((res) => {
        setFilmInfo(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Films
            handleChange={handleChange}
            state={state}
            handleClickInfo={handleClickInfo}
          />
        </Route>
      </Switch>
    </>
  );
}