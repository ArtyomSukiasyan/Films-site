import React from "react";


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
        <main >
          <div >
            
            <h1>
              Log in
            </h1>
            <form  noValidate>
              <input
                value={this.state.email}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.handleChangeEmail}
              />
              <p>{this.state.isExistEmail}</p>
              <input
                value={this.state.password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChangePassword}
              />
              <p>{this.state.isWrongPassword}</p>
              <button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!checkValidation}
                onClick={this.onRegister}
              >
                Log in
              </button>
            </form>
          </div>
        </main>
      </>
    );
  }
}