import React from 'react';
import { useRouter } from 'next/router';

const StockMenu: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/ConteudoEstoque');
  };

  return (
    <div>
      <h2>Menu Estoque</h2>
      <button onClick={handleClick}>Ver Conteúdo do Estoque</button>
    </div>
  );
};

export default StockMenu;
