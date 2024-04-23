import Image from "next/image";
import styles from "./page.module.css"; // Importe o componente de login aqui
import LoginForm from "./components/loginForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <LoginForm/>
    </main>
  );
}