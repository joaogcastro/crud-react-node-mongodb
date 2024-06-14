import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Link from 'next/link';

interface Props {

}

const Login: React.FC<Props> = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const handleusernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setusername(event.target.value);
  };

  const handlepasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.2:4000/user/auth', {
        username,
        password
      });
      console.log('Response:', response.data);
      
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">username:</label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={handleusernameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlepasswordChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;