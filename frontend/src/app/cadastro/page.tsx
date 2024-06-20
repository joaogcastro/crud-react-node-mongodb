'use client';
import { useEffect, useState, useRef, FormEvent } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import axios from 'axios';
//import './CadastroProdutos.css';

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

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await axios.get('http://127.0.0.2:4000/product/getAll');
      setProducts(response.data || []);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (
      !nameProductRef.current?.value ||
      !typeProductRef.current?.value ||
      !quantityProductRef.current?.value ||
      !priceProductRef.current?.value
    )
      return;

    try {
      const response = await axios.post('http://127.0.0.2:4000/product/create', {
        nameProduct: nameProductRef.current?.value,
        typeProduct: typeProductRef.current?.value,
        quantityProduct: quantityProductRef.current?.value,
        priceProduct: priceProductRef.current?.value,
      });
      console.log(response.data);
      loadProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }

    nameProductRef.current.value = '';
    typeProductRef.current.value = '';
    quantityProductRef.current.value = '';
    priceProductRef.current.value = '';
  }

  async function handleDelete(id: string) {
    try {
      const response = await axios.delete(`http://127.0.0.2:4000/product/delete/${id}`);
      console.log('Delete successful:', response.data);
      loadProducts();
    } catch (error) {
      console.error('Error:', error);
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
            <p className="no-products">Nenhum produto encontrado.</p>
          )}
        </section>
      </main>
    </div>
  );
}
