import React from "react";
import getID from "../Helpers/GetID";
import Header from "./Header";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
      isExistEmail: "",
      isValidName: false,
      isValidSurname: false,
      isValidEmail: false,
      isValidPassword: false,
    };
  }

  handleChangeName = (e) => {
    this.setState({ name: e.target.value });
    const nameCheck = /^[a-zA-Z ]{1,30}$/;
    const isValid = nameCheck.test(e.target.value);
    if (isValid) {
      this.setState({ isValidName: true });
    } else if (e.target.value === "") {
      this.setState({ isValidName: false });
    } else {
      this.setState({
        isValidName: false,
      });
    }
  };

  handleChangeSurname = (e) => {
    this.setState({ surname: e.target.value });
    const surnameCheck = /^[a-zA-Z ]{1,30}$/;
    const isValid = surnameCheck.test(e.target.value);
    if (isValid) {
      this.setState({ isValidSurname: true });
    } else if (e.target.value === "") {
      this.setState({ isValidSurname: false });
    } else {
      this.setState({
        isValidSurname: false,
      });
    }
  };

  handleChangeEmail = (e) => {
    const users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === e.target.value) {
        this.setState({
          isExistEmail: "You're registered, please login",
        });
        break;
      } else {
        this.setState({
          isExistEmail: "",
        });
      }
    }

    this.setState({ email: e.target.value });
    const mailCheck =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValid = mailCheck.test(e.target.value);
    if (isValid) {
      this.setState({ isValidEmail: true });
    } else if (e.target.value === "") {
      this.setState({ isValidEmail: false });
    } else {
      this.setState({
        isValidEmail: false,
      });
    }
  };

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
    const passwordCheck =
      /^(?=.*[0-9])(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{6,16}$/;
    const isValid = passwordCheck.test(e.target.value);
    if (isValid) {
      this.setState({ isValidPassword: true });
    } else if (e.target.value === "") {
      this.setState({ isValidPassword: false });
    } else {
      this.setState({
        isValidPassword: false,
      });
    }
  };

  onRegister = () => {
    const users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];
    localStorage.setItem(
      "users",
      JSON.stringify([
        ...users,
        {
          id: getID(users),
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.email,
          password: this.state.password,
        },
      ])
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify([
        {
          id: getID(users),
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.email,
          password: this.state.password,
        },
      ])
    );
  };

  render() {
    const checkValidation =
      this.state.isValidEmail &&
      this.state.isValidPassword &&
      this.state.isValidName &&
      this.state.isValidPassword &&
      !this.state.isExistEmail;

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
                value={this.state.name}
                variant="outlined"
                margin="normal"
                autoFocus
                required
                fullWidth
                id="name"
                placeholder="Name"
                name="name"
                onChange={this.handleChangeName}
              />
              <input
                className="mt-6 px-8  w-full border rounded py-2 text-gray-700 focus:outline-none"
                value={this.state.surname}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="surname"
                placeholder="Surname"
                name="surname"
                onChange={this.handleChangeSurname}
              />
              <input
                className="mt-6 px-8  w-full border rounded py-2 text-gray-700 focus:outline-none"
                value={this.state.email}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                placeholder="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.handleChangeEmail}
              />
              <p>{this.state.isExistEmail}</p>
              <input
                className="mt-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none"
                value={this.state.password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChangePassword}
              />
              <button
                className="mt-6 w-full py-2 rounded-full bg-gray-900 text-gray-100 focus:outline-none"
                type="submit"
                variant="contained"
                color="primary"
                disabled={!checkValidation}
                onClick={this.onRegister}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}