import React, { Component } from "react";
import { toast } from "react-toastify";
import TextFieldGroup from "./../common/TextFieldGroup";
import axios from "axios";

class ResetPass extends Component {
  state = {
    password: "",
    passwordConfirm: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = event => {
    event.preventDefault();

    axios
      .post("/api/users/reset_password", {
        ...this.state,
        resetToken: this.props.match.params.token
      })
      .then(response => {
        toast.success(
          "Successfully Changed Password. You will be redirected in a few seconds."
        );
        setTimeout(() => {
          this.props.history.push("/login");
        }, 4000);
      })
      .catch(e => {
        toast.error(e.response.data.errors[0].detail);
      });
  };

  componentDidMount() {
    const resetToken = this.props.match.params.token;
    this.setState({ resetToken });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={event => this.submitForm(event)}>
          <h2>Reset password</h2>

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
            value="Reset Password"
            className="btn btn-warning btn-block"
          />
        </form>
      </div>
    );
  }
}

export default ResetPass;
