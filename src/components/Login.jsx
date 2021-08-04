import React from "react";
import Header from "./Header";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isExistEmail: "",
      isWrongPassword: "",
      isValidEmail: false,
      isValidPassword: false,
    };
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value, isExistEmail: "" });
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
    this.setState({ password: e.target.value, isWrongPassword: "" });
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

    let getEmail = false;
    let id;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === this.state.email) {
        getEmail = true;
        id = i;
      }
    }
    if (!getEmail) {
      this.setState({
        isExistEmail: "Email not found, please register",
      });
    } else if (users[id].password !== this.state.password) {
      this.setState({
        isWrongPassword: "Wrong password!",
      });
    } else {
      localStorage.setItem("currentUser", JSON.stringify([users[id]]));
    }
  };

  render() {
    const checkValidation =
      this.state.isValidEmail &&
      this.state.isValidPassword &&
      !this.state.isExistEmail;
    return (
      <>
        <Header />
        <div className="w-full h-screen pt-32">
          <div className="text-center mb-4 text-4xl">
            <h1>Log in</h1>
          </div>
          <div className="flex justify-center">
            <form noValidate className="w-full md:w-1/3 rounded-lg">
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
