'use client';
import { useState, useRef, FormEvent } from 'react';
import { FiTrash } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import styles from './Cadastro.module.css'; // Importe o CSS module

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
      setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  }

  return (
    <div className={styles.cadastroContainer}>
      <main className={styles.cadastroMain}>
        <h1 className={styles.cadastroTitle}>Produtos</h1>

        <form className={styles.cadastroForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nome do Produto:</label>
            <input
              type="text"
              placeholder="Digite o nome do produto..."
              ref={nameProductRef}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Tipo do Produto:</label>
            <input
              type="text"
              placeholder="Digite o tipo do produto..."
              ref={typeProductRef}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Quantidade:</label>
            <input
              type="number"
              placeholder="Digite a quantidade..."
              ref={quantityProductRef}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Preço:</label>
            <input
              type="number"
              step="0.01"
              placeholder="Digite o preço..."
              ref={priceProductRef}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Cadastrar
          </button>
        </form>

        <button
          className={styles.backButton}
          onClick={() => router.push('/menu')}
        >
          Voltar
        </button>

        <section className={styles.productsList}>
          {products.length > 0 ? (
            products.map((product) => (
              <article key={product._id} className={styles.productCard}>
                <p>
                  <span className={styles.productLabel}>Nome:</span> {product.nameProduct}
                </p>
                <p>
                  <span className={styles.productLabel}>Tipo:</span> {product.typeProduct}
                </p>
                <p>
                  <span className={styles.productLabel}>Quantidade:</span> {product.quantityProduct}
                </p>
                <p>
                  <span className={styles.productLabel}>Preço:</span> {product.priceProduct}
                </p>

                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(product._id)}
                >
                  <FiTrash size={18} color="white" />
                </button>
              </article>
            ))
          ) : (
            <p className={styles.noProducts}>Nenhum produto cadastrado.</p>
          )}
        </section>
      </main>
    </div>
  );
}
