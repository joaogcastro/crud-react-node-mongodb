import React from 'react';
import ProductTable from '../src/app/components/ProductTable';
import BackButton from '@/app/components/BackButton';
import '@/app/ConteudoEstoque.css';
import { useState } from 'react';
import create from 'zustand';

interface SearchState {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}
const useSearchStore = create ((set): SearchState => ({
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));

const products = [
  { id: 1, name: 'Tênis Nice UltraFast', size: 41, quantity: 5 },
  { id: 2, name: 'Tênis Nice UltraFast', size: 40, quantity: 3 },
  { id: 3, name: 'Tênis Nice UltraFast', size: 42, quantity: 2 },
  { id: 4, name: 'Tênis Casual Comfort', size: 40, quantity: 8 },
  { id: 5, name: 'Tênis Casual Comfort', size: 39, quantity: 6 },
  { id: 6, name: 'Tênis Casual Comfort', size: 41, quantity: 4 },
  { id: 7, name: 'Sandália de Praia Conforto', size: 39, quantity: 12 },
  { id: 8, name: 'Sandália de Praia Conforto', size: 38, quantity: 8 },
  { id: 9, name: 'Sandália de Praia Conforto', size: 40, quantity: 5 },
  { id: 10, name: 'Bota de Trilha Adventure', size: 42, quantity: 6 },
  { id: 11, name: 'Bota de Trilha Adventure', size: 41, quantity: 4 },
  { id: 12, name: 'Bota de Trilha Adventure', size: 43, quantity: 3 },
  { id: 13, name: 'Chinelo Slide Esportivo', size: 43, quantity: 10 },
  { id: 14, name: 'Chinelo Slide Esportivo', size: 42, quantity: 7 },
  { id: 15, name: 'Chinelo Slide Esportivo', size: 44, quantity: 5 },
  { id: 16, name: 'Sapato Social Clássico', size: 38, quantity: 7 },
  { id: 17, name: 'Sapato Social Clássico', size: 37, quantity: 5 },
  { id: 18, name: 'Sapato Social Clássico', size: 39, quantity: 3 },
  { id: 19, name: 'Tênis de Corrida Leve', size: 44, quantity: 15 },
  { id: 20, name: 'Tênis de Corrida Leve', size: 43, quantity: 10 },
  { id: 21, name: 'Tênis de Corrida Leve', size: 45, quantity: 8 },
  { id: 22, name: 'Sapatilha Feminina Casual', size: 37, quantity: 9 },
  { id: 23, name: 'Sapatilha Feminina Casual', size: 36, quantity: 3 },
  { id: 24, name: 'Sapatilha Feminina Casual', size: 38, quantity: 5 },
  { id: 25, name: 'Chuteira Society Profissional', size: 42, quantity: 20 },
  { id: 26, name: 'Chuteira Society Profissional', size: 41, quantity: 15 },
  { id: 27, name: 'Chuteira Society Profissional', size: 43, quantity: 10 },
  { id: 28, name: 'Bota Cano Curto Elegance', size: 39, quantity: 4 },
  { id: 29, name: 'Bota Cano Curto Elegance', size: 38, quantity: 2 },
  { id: 30, name: 'Bota Cano Curto Elegance', size: 40, quantity: 3 }
];

const ConteudoEstoque: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearchStore(); // Usa o store de pesquisa

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="back-button-container">
        <BackButton />
      </div>
      <h1>Produtos no estoque</h1>
      <div id="divBusca">
        <input
          type="text"
          id="txtBusca"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button id="btnBusca" onClick={() => setSearchTerm('')}>
          Limpar
        </button>
      </div>

      <ProductTable products={filteredProducts} />
    </div>
  );
};

export default ConteudoEstoque;
