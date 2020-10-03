import React, { Component } from "react";
import { toast } from "react-toastify";
import TextFieldGroup from "./../common/TextFieldGroup";
import axios from "axios";

class SendEmail extends Component {
  state = {
    email: ""
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitForm = event => {
    event.preventDefault();
    axios
      .post("/api/users/forgot_password", this.state)
      .then(response => {
        toast.success(
          "An email for resetting your password has been sent to that email address"
        );
      })
      .catch(e => {
        toast.error(e[0].detail);
      });
  };
  render() {
    return (
      <React.Fragment>
        <h1>
          Enter your email and we will email you a link to change your password
        </h1>
        <form onSubmit={this.submitForm}>
          <TextFieldGroup
            type="email"
            placeholder="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            required
          />

          <input
            type="submit"
            value="Send email"
            className="btn btn-warning btn-block"
          />
        </form>
      </React.Fragment>
    );
  }
}

export default SendEmail;
