"use client";
import React from 'react';
import StockMenu from '@/app/components/StockMenu';
import '@/app/MenuEstoque.css';

const MenuEstoque = () => {
  return (
    <div className="menu-container">
      <h1>Menu do Estoque</h1>
      <StockMenu />
    </div>
  );
};
export default MenuEstoque;
