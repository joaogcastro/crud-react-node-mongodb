import React from 'react';
import create from 'zustand';

// Defina o store Zustand para gerenciar o estado de produtos
interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
}

interface Product {
  id: number;
  name: string;
  size: number;
  quantity: number;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
}));

const AddProductForm: React.FC = () => {
  const [productName, setProductName] = React.useState<string>('');
  const [productSize, setProductSize] = React.useState<number>(0);
  const [productQuantity, setProductQuantity] = React.useState<number>(0);

  const { addProduct } = useProductStore();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newProduct: Product = {
      id: Math.floor(Math.random() * 1000), // Gera um ID aleatório para o produto
      name: productName,
      size: productSize,
      quantity: productQuantity,
    };
    addProduct(newProduct);
    // Limpar os campos do formulário após adicionar o produto
    setProductName('');
    setProductSize(0);
    setProductQuantity(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="productName">Nome do Produto:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="productSize">Tamanho:</label>
        <input
          type="number"
          id="productSize"
          value={productSize}
          onChange={(e) => setProductSize(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label htmlFor="productQuantity">Quantidade:</label>
        <input
          type="number"
          id="productQuantity"
          value={productQuantity}
          onChange={(e) => setProductQuantity(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Adicionar Produto</button>
    </form>
  );
};

export default AddProductForm;