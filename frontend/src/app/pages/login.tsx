import React from 'react';
import Login from '../login/page'; // Ajuste o caminho conforme necessário
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      <Login />
    </div>
  );
}

export default LoginPage;
