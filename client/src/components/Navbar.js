import React, { Component } from "react";
import StoreSearchInput from "./search/StoreSearchInput";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "./../actions/authActions";

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { isAuth, avatar, name, hearts } = this.props.user.userData;

    const authLinks = (
      <React.Fragment>
        <li className="nav-item mx-1">
          <Link
            to="/hearts"
            className="nav-link d-flex flex-column align-items-center"
          >
            <i className="far fa-heart" />
            {hearts && <span>{hearts.length}</span>}
          </Link>
        </li>
        <li className="nav-item mx-1">
          <Link to="/profile" className="nav-link">
            <img
              className="rounded-circle"
              src={avatar}
              alt={name}
              style={{ width: "25px", marginRight: "5px" }}
            />
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.onLogoutClick} className="nav-link">
            Logout
          </a>
        </li>
      </React.Fragment>
    );

    const guestLinks = (
      <React.Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </React.Fragment>
    );
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
          Fixian
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/garages">
                <i className="fas fa-store" /> Garages
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tags">
                <i className="fas fa-tags" /> Tags
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/top">
                <i className="fas fa-trophy" /> Top
              </Link>
            </li>
            {isAuth && (
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  <i className="far fa-plus-square" /> Add
                </Link>
              </li>
            )}
          </ul>

          <StoreSearchInput />

          <ul className="navbar-nav ml-auto">
            {isAuth ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
