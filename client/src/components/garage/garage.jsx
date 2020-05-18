import React from "react";
import customer from "../../assets/mechanic.png";
import styles from "./garage.module.css";
const Garage = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.element}>
          <img src={customer} className={styles.customer} />
        </div>
        <button className={styles.usrBtn}>Fixian for Garages</button>
      </div>
    </div>
  );
};

export default Garage;
