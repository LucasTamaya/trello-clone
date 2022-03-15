import styles from "../styles/AuthLoading.module.css";

// animation de loading au niveau du login et du signup

const AuthLoading = () => {
  return (
    <div className={styles.ldsRoller}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default AuthLoading;
