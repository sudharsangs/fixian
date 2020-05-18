import React from "react";
//import {Link,  withRouter} from 'react-router-dom';
import User from "../user/user";
import Garage from "../garage/garage";
import styles from "./home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <h1>Fixian</h1>
      <div className={styles.wrapper}>
        <User className={`${styles.user} ${styles.card}`} />
        <Garage className={`${styles.garage} ${styles.card}`} />
      </div>
    </div>
  );
}

export default Home;
