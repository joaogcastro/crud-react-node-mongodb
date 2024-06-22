'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
//import './Menu.css';

const Menu: React.FC = () => {
  const router = useRouter();

  const handleGoToStock = () => {
    router.push('/stock');
  };

  const handleGoToCadastrarProdutos = () => {
    router.push('/cadastro');
  };

  return (
    <div className="menu-container">
      <h1>Bem-vindo ao Menu</h1>
      <p>Você está logado!</p>
      <button className="menu-button" onClick={handleGoToStock}>Ir para Stock</button>
      <button className="menu-button" onClick={handleGoToCadastrarProdutos}>Cadastrar Produtos</button>
    </div>
  );
}

export default Menu;