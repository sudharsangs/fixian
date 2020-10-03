import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { addStore } from "./../actions/storeActions";
import StoreForm from "./StoreForm";

class AddStore extends Component {
  onSubmit = store => {
    this.props
      .addStore(store)
      .then(store => {
        this.props.history.push({
          pathname: `/stores`,
          state: { added: true }
        });
      })
      .catch(e => {
        toast.error(e[0].detail);
      });
  };
  render() {
    return (
      <div>
        <h1>Add Store</h1>
        <StoreForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { addStore }
)(AddStore);
