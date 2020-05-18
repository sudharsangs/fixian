import React from "react";
import styles from "./user.module.css";
import customer from "../../assets/customer.png";

const User = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.element}>
        <img src={customer} className={styles.customer} />
      </div>
      <button className={styles.usrBtn}>Fixian for Customers</button>
    </div>
  );
};

export default User;
