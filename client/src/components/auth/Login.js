import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser, auth } from "./../../actions/authActions";
import TextFieldGroup from "./../common/TextFieldGroup";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    loginUser(this.state)
      .then(() => {
        this.props.auth();
      })
      .catch(e => {
        toast.error(e[0].detail);
      });
  };
  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Fixian account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
                <button
                  className="btn btn-warning btn-block d-block"
                  onClick={this.submitForm}
                >
                  Log in
                </button>
                <button
                  className="btn btn-warning btn-block d-block"
                  type="button"
                  onClick={() => this.props.history.push("/forgot_password")}
                >
                  Forgot my password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { auth }
  )(Login)
);
