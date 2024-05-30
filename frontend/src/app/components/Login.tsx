import React, { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';

interface Props {
  // Defina propriedades opcionais aqui, se necessário
}

const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://seu-backend-endereco.com/api/login', {
        email,
        phone
      });
      console.log('Response:', response.data);
      // Você pode adicionar lógica adicional para lidar com a resposta do backend aqui
    } catch (error) {
      console.error('Error:', error);
      // Adicione lógica para lidar com erros aqui
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          required
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>Login</button>
    </form>
  );
}

export default Login;