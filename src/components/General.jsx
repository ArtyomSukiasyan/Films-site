import { useEffect, useMemo, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Films from "./Films";
import axios from "axios";
import FetchData from "./FetchData";
import SearchData from "./SearchData";
import Login from "./Login";
import SignIn from "./Signin";
import LogOut from "./LogOut";

export default function General() {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  let history = useHistory();

  const getData = useMemo(
    () => (searchValue ? SearchData : FetchData),
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
    }).catch((err) => {
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
        <Route path="/films/favorites">
          {localStorage.getItem("currentUser") ? (
          <Films />) : (
          <Redirect to="/login" /> )}
        </Route>

        <Route path="/sign-in">
          <SignIn />
        </Route>
        {localStorage.getItem("currentUser") ? (
          <Route path="/logout">
            <LogOut />
          </Route>
        ) : (
          <Route path="/login">
            <Login />
          </Route>
        )}
      </Switch>
    </>
  );
}
