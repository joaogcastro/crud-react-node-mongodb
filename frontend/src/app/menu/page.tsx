'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Menu.module.css';  // Corrija o caminho se necessário

const Menu: React.FC = () => {
  const router = useRouter();

  const handleGoToStock = () => {
    router.push('/stock');
  };

  const handleGoToCadastrarProdutos = () => {
    router.push('/cadastro');
  };

  return (
    <div className={styles.menuContainer}>
      <h1>Bem-vindo ao Menu</h1>
      <p>Você está logado!</p>
      <button className={styles.menuButton} onClick={handleGoToStock}>Ir para Stock</button>
      <button className={styles.menuButton} onClick={handleGoToCadastrarProdutos}>Cadastrar Produtos</button>
    </div>
  );
}

export default Menu;
