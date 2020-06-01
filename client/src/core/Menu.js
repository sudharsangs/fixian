import React from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "./Menu.module.css";

function Menu() {
  return (
    <nav className="navbar navbar-light bg-primary navbar-expand-sm">
      <Link to="/" className="navbar-brand">
        <span className={styles.headFont}>Fixian</span>
      </Link>
      <ul className="navbar-nav ml-auto">
        <li className="navbar-item">
          <Link to="/garagesignup" className="nav-link">
            <span className={styles.sideFont}>For Garages</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/usersignup" className="nav-link">
            <span className={styles.sideFont}>For Users</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(Menu);
