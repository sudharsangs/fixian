import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class StoreSearchInput extends Component {
  state = {
    searchValue: ""
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { push } = this.props.history;
    const { searchValue } = this.state;
    searchValue ? push(`/stores/${searchValue}/search`) : push("/stores");
  };
  render() {
    return (
      <form onSubmit={this.onSubmit} className="form-inline my-2 my-lg-0">
        <input
          type="search"
          className="form-control"
          name="searchValue"
          placeholder="Search for stores"
          value={this.state.searchValue}
          onChange={this.onChange}
          aria-label="Search"
        />
      </form>
    );
  }
}

export default withRouter(StoreSearchInput);
