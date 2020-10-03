import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { registerUser } from "./../../actions/authActions";
import TextFieldGroup from "./../common/TextFieldGroup";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    registerUser(newUser)
      .then((response) => {
        toast.success(
          "Successfully Registered. You will be redirected in a few seconds."
        );
        setTimeout(() => {
          this.props.history.push("/login");
        }, 4000);
      })
      .catch((e) => {
        toast.error(e[0].detail);
      });
  };
  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Fixian account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  required
                />
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
                <TextFieldGroup
                  type="password"
                  placeholder="Confirm Password"
                  name="passwordConfirm"
                  value={this.state.passwordConfirm}
                  onChange={this.onChange}
                  required
                />
                <input
                  type="submit"
                  className="btn btn-warning btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Register);
