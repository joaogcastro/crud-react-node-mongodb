import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>Sistema de login</h1>
        <div>
          <form>
            <input type="text" name="username" placeholder="Nome de usuário" required></input>
            <input type="password" name="password" placeholder="Senha" required></input>
            <input type="submit" value="Entrar"></input>
          </form>
        </div>  
      </div>
    </main>
  );
}
