import React from "react";
import getID from "../Helpers/GetID";
import Header from "./Header";
import { useState } from "react";

export default function SignIn() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isExistEmail, setIsExistEmail] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidSurname, setIsValidSurname] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const handleChangeName = (e) => {
    setName(e.target.value);
    const nameCheck = /^[a-zA-Z ]{1,30}$/;
    const isValid = nameCheck.test(e.target.value);
    if (isValid) {
      setIsValidName(true);
    } else if (e.target.value === "") {
      setIsValidName(false);
    } else {
      setIsValidName(false);
    }
  };

  const handleChangeSurname = (e) => {
    setSurname(e.target.value);
    const surnameCheck = /^[a-zA-Z ]{1,30}$/;
    const isValid = surnameCheck.test(e.target.value);
    if (isValid) {
      setIsValidSurname(true);
    } else if (e.target.value === "") {
      setIsValidSurname(false);
    } else {
      setIsValidSurname(false);
    }
  };

  const handleChangeEmail = (e) => {
    const users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === e.target.value) {
        setIsExistEmail("You're registered, please login");

        break;
      } else {
        setIsExistEmail("");
      }
    }
    setEmail(e.target.value);
    const mailCheck =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValid = mailCheck.test(e.target.value);
    if (isValid) {
      setIsValidEmail(true);
    } else if (e.target.value === "") {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(false);
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    const passwordCheck =
      /^(?=.*[0-9])(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{6,16}$/;
    const isValid = passwordCheck.test(e.target.value);
    if (isValid) {
      setIsValidPassword(true);
    } else if (e.target.value === "") {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(false);
    }
  };

  const onRegister = () => {
    const users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];
    localStorage.setItem(
      "users",
      JSON.stringify([
        ...users,
        {
          id: getID(users),
          name: name,
          surname: surname,
          email: email,
          password: password,
        },
      ])
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify([
        {
          id: getID(users),
          name: name,
          surname: surname,
          email: email,
          password: password,
        },
      ])
    );
  };

  const checkValidation =
  isValidName &&
  isValidSurname&&
    isValidEmail &&
    isValidPassword &&
    !isExistEmail;

  return (
    <>
      <Header />
      <div className="w-full h-screen pt-32">
        <div className="text-center mb-4 text-4xl">
          <h1>Sign in</h1>
        </div>
        <div className="flex justify-center">
          <form noValidate className="w-full md:w-1/3 rounded-lg">
            <input
              className=" mt-6 px-8  w-full border rounded py-2 text-gray-700 focus:outline-none"
              value={name}
              variant="outlined"
              margin="normal"
              autoFocus
              required
              fullWidth
              id="name"
              placeholder="Name"
              name="name"
              onChange={handleChangeName}
            />
            <input
              className="mt-6 px-8  w-full border rounded py-2 text-gray-700 focus:outline-none"
              value={surname}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="surname"
              placeholder="Surname"
              name="surname"
              onChange={handleChangeSurname}
            />
            <input
              className="mt-6 px-8  w-full border rounded py-2 text-gray-700 focus:outline-none"
              value={email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChangeEmail}
            />
            <p>{isExistEmail}</p>
            <input
              className="mt-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none"
              value={password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChangePassword}
            />
            <button
              className="mt-6 w-full py-2 rounded-full bg-gray-900 text-gray-100 focus:outline-none"
              type="submit"
              variant="contained"
              color="primary"
              disabled={!checkValidation}
              onClick={onRegister}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
