import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { getStore, editStore } from "./../actions/storeActions";

import StoreForm from "./StoreForm";
import Spinner from "./../components/common/Spinner/Spinner";

class EditStore extends Component {
  state = {
    name: "",
    description: "",
    tags: []
  };
  componentDidMount() {
    this.props.getStore(this.props.match.params.id);
  }

  onSubmit = store => {
    this.props
      .editStore(this.props.match.params.id, store)
      .then(() => {
        this.props.history.push({
          pathname: `/stores`,
          state: { edited: true }
        });
      })
      .catch(e => {
        toast.error(e[0].detail);
      });
  };
  render() {
    return (
      <div>
        <h1>Edit Store</h1>
        {this.props.store.store ? (
          <StoreForm onSubmit={this.onSubmit} store={this.props.store.store} />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { store: state.store };
};

export default connect(
  mapStateToProps,
  { getStore, editStore }
)(EditStore);
