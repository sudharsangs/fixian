import React, { Component } from "react";
import { toast } from "react-toastify";
import TextFieldGroup from "./../common/TextFieldGroup";
import { connect } from "react-redux";
import { updateProfile, auth } from "./../../actions/authActions";

class Profile extends Component {
  state = {
    name: this.props.user.name,
    email: this.props.user.email
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    updateProfile(this.state)
      .then(response => {
        toast.success("Successfully Updated your info");
        this.props.auth();
      })
      .catch(e => {
        toast.error(e[0].detail);
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            type="text"
            label="Name"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
            required
          />
          <TextFieldGroup
            type="email"
            label="Email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            required
          />
          <input
            type="submit"
            className="btn btn-warning btn-block mt-4"
            value="Update my Account"
          />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { auth }
)(Profile);
