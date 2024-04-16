import React from "react";
import "./loginPage.css";

const LoginPage = () => {
    return (
      <div className="loginForm">
            <h1>Login</h1>

            <form>
                <input type="text" name="username" placeholder="Nome de usuário" required></input>
                <input type="password" name="password" placeholder="Senha" required></input>
                <input type="submit" value="Entrar"></input>
          </form>
      </div>
    );
  };

export default LoginPage;