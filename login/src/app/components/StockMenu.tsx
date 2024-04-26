import React from 'react';
import { useRouter } from 'next/router';
import '@/app/MenuEstoque.css'
import { Url } from 'next/dist/shared/lib/router/router';

const StockMenu: React.FC = () => {
  const router = useRouter();

  const handleClick = (url: string) => {
    router.push(url);
  };

  return (
    <div className="stock-menu-container">
      <h2>Menu Estoque</h2>
      <button onClick={() => handleClick('/ConteudoEstoque')}>Ver Conteúdo do Estoque</button>
      <button onClick={() => handleClick('/AdicionarProdutos')}>Adicionar mais produtos ao estoque</button>
    </div>
  );
};

export default StockMenu;
