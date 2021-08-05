import React from "react";
import Header from "./Header";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isExistEmail, setIsExistEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setIsExistEmail("");
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
    setIsWrongPassword("");
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

    let getEmail = false;
    let id;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        getEmail = true;
        id = i;
      }
    }
    if (!getEmail) {
      setIsExistEmail("Email not found, please register");
    } else if (users[id].password !== password) {
      setIsWrongPassword("Wrong password!");
    } else {
      localStorage.setItem("currentUser", JSON.stringify([users[id]]));
    }
  };

  const checkValidation = isValidEmail && isValidPassword && !isExistEmail;
  return (
    <>
      <Header />
      <div className="w-full h-screen pt-32">
        <div className="text-center mb-4 text-4xl">
          <h1>Sign in</h1>
        </div>
        <form>
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
          <p>{isWrongPassword}</p>

          <button
            className="mt-6 w-full py-2 rounded-full bg-gray-900 text-gray-100 focus:outline-none"
            type="submit"
            variant="contained"
            color="primary"
            disabled={!checkValidation}
            onClick={onRegister}
          >
            Log in
          </button>
        </form>
      </div>
    </>
  );
}
