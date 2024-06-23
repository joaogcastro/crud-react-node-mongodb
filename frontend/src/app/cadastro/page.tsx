'use client';
import { useState, useRef, FormEvent } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import axios from 'axios';
//import './CadastroProdutos.css'; // Certifique-se de que este arquivo existe e está correto

interface ProductProps {
  _id: string;
  nameProduct: string;
  typeProduct: string;
  quantityProduct: number;
  priceProduct: number;
}

export default function CadastroProdutos() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const nameProductRef = useRef<HTMLInputElement | null>(null);
  const typeProductRef = useRef<HTMLInputElement | null>(null);
  const quantityProductRef = useRef<HTMLInputElement | null>(null);
  const priceProductRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (
      !nameProductRef.current?.value ||
      !typeProductRef.current?.value ||
      !quantityProductRef.current?.value ||
      !priceProductRef.current?.value
    ) {
      console.warn('Todos os campos são obrigatórios');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.2:4000/product/create', {
        nameProduct: nameProductRef.current?.value,
        typeProduct: typeProductRef.current?.value,
        quantityProduct: Number(quantityProductRef.current?.value),
        priceProduct: Number(priceProductRef.current?.value),
      });
      console.log('Produto criado ou atualizado:', response.data);

      // Atualizar o estado com o produto atualizado
      const updatedProduct = response.data.product;
      setProducts((prevProducts) => {
        const existingProductIndex = prevProducts.findIndex(
          (product) => product._id === updatedProduct._id
        );

        if (existingProductIndex >= 0) {
          const newProducts = [...prevProducts];
          newProducts[existingProductIndex] = updatedProduct;
          return newProducts;
        } else {
          return [...prevProducts, updatedProduct];
        }
      });
    } catch (error) {
      console.error('Erro ao criar ou atualizar produto:', error);
    }

    // Limpar os campos do formulário
    if (nameProductRef.current) nameProductRef.current.value = '';
    if (typeProductRef.current) typeProductRef.current.value = '';
    if (quantityProductRef.current) quantityProductRef.current.value = '';
    if (priceProductRef.current) priceProductRef.current.value = '';
  }

  async function handleDelete(id: string) {
    try {
      const response = await axios.delete('http://127.0.0.2:4000/product/delete', {
        data: { id: id },
      });
      console.log('Produto deletado:', response.data);

      // Atualizar o estado removendo o produto deletado
      setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  }

  return (
    <div className="cadastro-container">
      <main className="cadastro-main">
        <h1 className="cadastro-title">Produtos</h1>

        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Produto:</label>
            <input
              type="text"
              placeholder="Digite o nome do produto..."
              ref={nameProductRef}
            />
          </div>

          <div className="form-group">
            <label>Tipo do Produto:</label>
            <input
              type="text"
              placeholder="Digite o tipo do produto..."
              ref={typeProductRef}
            />
          </div>

          <div className="form-group">
            <label>Quantidade:</label>
            <input
              type="number"
              placeholder="Digite a quantidade..."
              ref={quantityProductRef}
            />
          </div>

          <div className="form-group">
            <label>Preço:</label>
            <input
              type="number"
              step="0.01"
              placeholder="Digite o preço..."
              ref={priceProductRef}
            />
          </div>

          <button type="submit" className="submit-button">
            Cadastrar
          </button>
        </form>

        <button
          className="back-button"
          onClick={() => router.push('/menu')}
        >
          Voltar
        </button>

        <section className="products-list">
          {products.length > 0 ? (
            products.map((product) => (
              <article key={product._id} className="product-card">
                <p>
                  <span className="product-label">Nome:</span> {product.nameProduct}
                </p>
                <p>
                  <span className="product-label">Tipo:</span> {product.typeProduct}
                </p>
                <p>
                  <span className="product-label">Quantidade:</span> {product.quantityProduct}
                </p>
                <p>
                  <span className="product-label">Preço:</span> {product.priceProduct}
                </p>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(product._id)}
                >
                  <FiTrash size={18} color="white" />
                </button>
              </article>
            ))
          ) : (
            <p className="no-products">Nenhum produto cadastrado.</p>
          )}
        </section>
      </main>
    </div>
  );
}
