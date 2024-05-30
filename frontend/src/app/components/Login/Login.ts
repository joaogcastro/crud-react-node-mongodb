import React, { useState } from 'react';
import styles from './page.module.css';

interface Props {
  // Defina propriedades opcionais aqui, se necessário
}

const Login: React.FC<Props> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar as credenciais do usuário para o backend
  };

  return (
   <>
  );
}

export default Login;
