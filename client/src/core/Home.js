import React from "react";
import Menu from "./Menu";
import styles from "./Home.module.css";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://fixian.now.sh">
        Fixian
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Home() {
  return (
    <>
      <Menu />
      <div className={styles.wrapper}>
        <img
          src={require("../assets/car1.svg")}
          alt=""
          className={styles.imgClass}
        />
        <h3>No Worries of Breakdown</h3>
        <img
          src={require("../assets/car2.svg")}
          alt=""
          className={styles.imgClass}
        />
        <h3>We are with you for your adventurous long drives</h3>
        <img
          src={require("../assets/car3.svg")}
          alt=""
          className={styles.imgClass}
        />
        <h3>We are partnered with all types of mechanics</h3>
        <img
          src={require("../assets/wait.svg")}
          alt=""
          className={styles.imgClass}
        />
        <h3>Pick up and drop by the mechanic. Tension free!</h3>
        <img
          src={require("../assets/home.svg")}
          alt=""
          className={styles.imgClass}
        />
        <h3>Mechanics at your door step</h3>
        <img
          src={require("../assets/map.svg")}
          alt=""
          className={styles.imgClass}
        />
        <h3>Locate garages near by.</h3>
      </div>
      <Copyright />
    </>
  );
}
