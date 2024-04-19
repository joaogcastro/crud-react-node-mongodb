"use client"
import { useState } from 'react';

const correct_username = 'teste123';
const correct_password = 'altair';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const handleSubmit = (e) => {
    let auth=0;
    e.preventDefault();
    
    if(username !== correct_username){
        setUsernameError('Usuário inexistente. Tente novamente.');
    }else{
        setUsernameError('');
        auth+=1;
    }

    if (password !== correct_password) {
      setPasswordError('Senha incorreta. Tente novamente.');
    } else {
      setPasswordError('');
      auth+=1;
    }

    if(auth===2){
        alert("Login realizado com sucesso");
        // Redirecionamento para a próxima página
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Usuário:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ borderColor: usernameError ? 'red' : '' }} // Altera a cor da borda se houver erro
        />
        {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>} {/* Exibe mensagem de erro, se houver */}
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ borderColor: passwordError ? 'red' : '' }} // Altera a cor da borda se houver erro
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>} {/* Exibe mensagem de erro, se houver */}
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;
