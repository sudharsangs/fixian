import React, { Component } from "react";
import { connect } from "react-redux";
import { getStoresByHearts } from "./../../actions/storeActions";
import Stores from "./../Stores";

class HeartedStores extends Component {
  componentDidMount() {
    this.props.getStoresByHearts();
  }
  render() {
    const { stores, loading } = this.props.store;
    return (
      <div>
        <h1 className="text-center my-3">Hearted Stores</h1>
        <Stores stores={stores} loading={loading} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { store: state.store };
};

export default connect(
  mapStateToProps,
  { getStoresByHearts }
)(HeartedStores);
