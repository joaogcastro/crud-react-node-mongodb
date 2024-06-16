'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  username: string;
  password: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.2:4000/user/getAll'); // Ajuste a URL para 127.0.0.1
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError('Resposta inesperada do servidor');
        }
      } catch (error) {
        setError('Erro ao buscar usuários');
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      {error && <p>{error}</p>}
      <ul>
        {Array.isArray(users) && users.map((user, index) => (
          <li key={index}>
            <strong>Username:</strong> {user.username} - <strong>Password:</strong> {user.password} - <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
