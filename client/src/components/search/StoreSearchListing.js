import React, { Component } from "react";
import { connect } from "react-redux";
import Stores from "./../Stores";
import { getStoresBySearch } from "./../../actions/storeActions";

class StoreSearchListing extends Component {
  componentWillMount() {
    this.props.getStoresBySearch(this.props.match.params.searchTerm);
  }
  componentDidUpdate(prevProps) {
    const currentSearchTerm = this.props.match.params.searchTerm;
    const prevSearchTerm = prevProps.match.params.searchTerm;

    if (currentSearchTerm !== prevSearchTerm) {
      this.props.getStoresBySearch(currentSearchTerm);
    }
  }
  renderTitle() {
    const { stores, loading } = this.props.store;
    const { searchTerm } = this.props.match.params;
    let title = "";

    if (loading) {
      title = "";
    } else {
      title = `${stores.length} result(s) for "${searchTerm}"`;
    }

    return <h1 className="my-2">{title}</h1>;
  }
  render() {
    const { stores, loading } = this.props.store;
    return (
      <div>
        {this.renderTitle()}
        <Stores stores={stores} loading={loading} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    store: state.store
  };
};

export default connect(
  mapStateToProps,
  { getStoresBySearch }
)(StoreSearchListing);
