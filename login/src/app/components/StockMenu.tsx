import React from 'react';
import { useRouter } from 'next/router';
import '@/app/MenuEstoque.css'

const StockMenu: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/ConteudoEstoque');
  };

  return (
    <div className="stock-menu-container">
      <h2>Menu Estoque</h2>
      <button onClick={handleClick}>Ver Conteúdo do Estoque</button>
    </div>
  );
};

export default StockMenu;
