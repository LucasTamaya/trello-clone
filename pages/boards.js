import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className={styles.container}>
      <nav>
        <Image src="/logo.svg" alt="trello logo" height="42" width="168" />
      </nav>

      <h3>Boards created by User</h3>
    </div>
  );
}
