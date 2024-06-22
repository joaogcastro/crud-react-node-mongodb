'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Corrigir importação
//import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.2:4000/user/auth', {
        username,
        password
      });

      console.log('Response:', response.data);

      // Verificar se a autenticação foi bem-sucedida
      if (response.data.auth) {
        console.log('Login bem-sucedido');
        router.push('/menu'); // Redirecionar para a página de Menu
      } else {
        console.log('Login falhou:', response.data.message);
        setErrorMessage('Username or Password incorrect');
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setErrorMessage('Failed to authenticate. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Login</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}

export default Login;
