import React, { Component } from "react";
import Spinner from "./common/Spinner/Spinner";
import StoreCard from "./StoreCard";

class Stores extends Component {
  render() {
    const { stores, loading } = this.props;
    const storeCards = loading ? (
      <Spinner />
    ) : (
      stores.map(store => {
        return <StoreCard key={store._id} storeData={store} />;
      })
    );
    return <div className="row">{storeCards}</div>;
  }
}

export default Stores;
