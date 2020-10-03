import React, { Component } from "react";
import TopStoreRow from "./TopStoreRow";
import { connect } from "react-redux";
import { getTopStores } from "./../../../actions/storeActions";

class TopStores extends Component {
  componentDidMount() {
    this.props.getTopStores();
  }
  render() {
    const { stores } = this.props.store;
    const storeRows = stores.map((s, i) => {
      return <TopStoreRow store={s} index={i} key={i} />;
    });
    return (
      <div>
        <h2>Top {stores.length} Stores</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Ranking</th>
              <th>Name</th>
              <th>Reviews</th>
              <th>Average Rating</th>
            </tr>
          </thead>
          <tbody>{storeRows}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { store: state.store };
};

export default connect(
  mapStateToProps,
  { getTopStores }
)(TopStores);
