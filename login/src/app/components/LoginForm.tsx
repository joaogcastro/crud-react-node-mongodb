"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const correct_username = 'teste123';
const correct_password = '123';

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let auth = 0;

    if (username !== correct_username) {
      setUsernameError('Usuário inexistente. Tente novamente.');
    } else {
      setUsernameError('');
      auth += 1;
    }

    if (password !== correct_password) {
      setPasswordError('Senha incorreta. Tente novamente.');
    } else {
      setPasswordError('');
      auth += 1;
    }

    if (auth === 2) {
      router.push('/MenuEstoque');
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
          style={{ borderColor: usernameError ? 'red' : '' }}
        />
        {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ borderColor: passwordError ? 'red' : '' }}
        />
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;
