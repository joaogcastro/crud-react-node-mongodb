'use client';
import { useEffect, useState, useRef, FormEvent } from 'react';
import { FiTrash } from 'react-icons/fi';
import axios from 'axios';

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
  const typeProductRef = useRef<HTMLInputElement>(null);
  const quantityProductRef = useRef<HTMLInputElement | null>(null);
  const priceProductRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await axios.get('/product/getAll');
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
      const response = await axios.post('/product/create', {
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
      const response = await axios.delete(`/product/delete/${id}`);
      console.log('Delete successful:', response.data);
      loadProducts();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="bg-gray-900 flex justify-center items-center h-screen">
      <main className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-4xl font-medium text-white mb-6">Produtos</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-white mb-2">Nome do Produto:</label>
            <input
              type="text"
              placeholder="Digite o nome do produto..."
              className="p-2 rounded bg-gray-700 text-white border border-gray-600"
              ref={nameProductRef}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Tipo do Produto:</label>
            <input
              type="text"
              placeholder="Digite o tipo do produto..."
              className="p-2 rounded bg-gray-700 text-white border border-gray-600"
              ref={typeProductRef}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Quantidade:</label>
            <input
              type="number"
              placeholder="Digite a quantidade..."
              className="p-2 rounded bg-gray-700 text-white border border-gray-600"
              ref={quantityProductRef}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Preço:</label>
            <input
              type="number"
              step="0.01"
              placeholder="Digite o preço..."
              className="p-2 rounded bg-gray-700 text-white border border-gray-600"
              ref={priceProductRef}
            />
          </div>

          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
          >
            Cadastrar
          </button>
        </form>

        <section className="flex flex-col gap-4 mt-6">
          {products.length > 0 ? (
            products.map((product) => (
              <article
                key={product._id}
                className="bg-gray-700 p-4 rounded flex flex-col gap-2 relative"
              >
                <p>
                  <span className="font-medium text-white">Nome:</span> {product.nameProduct}
                </p>
                <p>
                  <span className="font-medium text-white">Tipo:</span> {product.typeProduct}
                </p>
                <p>
                  <span className="font-medium text-white">Quantidade:</span> {product.quantityProduct}
                </p>
                <p>
                  <span className="font-medium text-white">Preço:</span> {product.priceProduct}
                </p>

                <button
                  className="bg-red-500 w-7 h-7 flex items-center justify-center rounded absolute right-0 top-0 -mt-3 -mr-3"
                  onClick={() => handleDelete(product._id)}
                >
                  <FiTrash size={18} color="white" />
                </button>
              </article>
            ))
          ) : (
            <p className="text-white">Nenhum produto encontrado.</p>
          )}
        </section>
      </main>
    </div>
  );
}
