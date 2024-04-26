"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/components/Login.css';

const correct_username = 'teste123';
const correct_password = '123';

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (username === correct_username && password === correct_password) {
      setError('');
      router.push('/MenuEstoque');
    } else {
      setError('Usuário ou senha incorretos. Tente novamente.');
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
          style={{ borderColor: error ? 'red' : '' }}
        />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ borderColor: error ? 'red' : '' }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;
