"use client";
import React from 'react';
import StockMenu from '@/app/components/StockMenu';
import '@/app/MenuEstoque.css';
import BackButton from '@/app/components/BackButton';

const MenuEstoque = () => {
  return (
    <div className="menu-container">
      <h1>Menu do Estoque</h1>
      <StockMenu />
      <div className="back-button-container">
        <BackButton />
      </div>
    </div>
  );
};
export default MenuEstoque;
