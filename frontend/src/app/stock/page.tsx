"use client"; // Adicione esta linha no início do arquivo

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EditProduct from './EditProduct';
import WithdrawProduct from './WithdrawProduct'; // Importe o componente WithdrawProduct
import { useStore } from './store'; // Importe a store do Zustand

interface Product {
    _id: string;
    nameProduct: string;
    typeProduct: string;
    quantityProduct: number;
    priceProduct: number;
}

const Stock: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterType, setFilterType] = useState<string>('name');
    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const [withdrawingProductId, setWithdrawingProductId] = useState<string | null>(null);
    const { selectedProductId, setSelectedProductId, lowStockProducts, setLowStockProducts } = useStore();
    const router = useRouter();

    const fetchProducts = () => {
        axios.get<Product[]>('http://127.0.0.2:4000/product/getAll')
            .then(response => {
                const fetchedProducts = response.data.products || [];
                setProducts(fetchedProducts);
                const lowStockIds = fetchedProducts
                    .filter(product => product.quantityProduct <= 5)
                    .map(product => product._id);
                setLowStockProducts(lowStockIds);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
                setProducts([]);
            });
    };

    const handleEdit = (productId: string) => {
        setEditingProductId(productId);
    };

    const handleWithdraw = (productId: string) => {
        setWithdrawingProductId(productId);
    };

    const handleDelete = (productId: string) => {
        axios.delete('http://127.0.0.2:4000/product/delete', {
            data: { id: productId },
        })
            .then(response => {
                console.log('Produto excluído com sucesso:', response.data);
                fetchProducts();
            })
            .catch(error => {
                console.error('Erro ao excluir produto:', error);
            });
    };

    const handleCloseModal = () => {
        setEditingProductId(null);
        setWithdrawingProductId(null);
    };

    const handleBack = () => {
        router.push('/menu');
    };

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            fetchProducts();
            return;
        }

        axios.post<Product[]>('http://127.0.0.2:4000/product/search', {
            filterType: filterType,
            searchTerm: searchTerm,
        })
            .then(response => {
                const searchedProducts = response.data.products || [];
                setProducts(searchedProducts);
                const lowStockIds = searchedProducts
                    .filter(product => product.quantityProduct <= 5)
                    .map(product => product._id);
                setLowStockProducts(lowStockIds);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
                setProducts([]);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleRowClick = (event: React.MouseEvent, productId: string) => {
        if ((event.target as HTMLElement).tagName === 'BUTTON') {
            // Ignore click events on buttons
            return;
        }
        setSelectedProductId(productId);
    };

    return (
        <div className="stock-container">
            <div className="search-bar-container">
                <button className="back-button" onClick={handleBack}>Voltar</button>
                <select
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                    className="filter-select"
                >
                    <option value="name">Nome</option>
                    <option value="type">Tipo</option>
                    <option value="quantity">Quantidade</option>
                    <option value="price">Preço</option>
                </select>
                <input
                    type="text"
                    placeholder={`Pesquisar por ${filterType}...`}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <button onClick={handleSearch} className="search-button">Pesquisar</button>
            </div>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Nome do Produto</th>
                        <th>Tipo do Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr
                                key={product._id}
                                style={{
                                    backgroundColor: lowStockProducts.includes(product._id) ? 'red' : (selectedProductId === product._id ? 'red' : 'transparent'),
                                }}
                                onClick={(event) => handleRowClick(event, product._id)}
                            >
                                <td>{product.nameProduct}</td>
                                <td>{product.typeProduct}</td>
                                <td>{product.quantityProduct}</td>
                                <td>{product.priceProduct}</td>
                                <td className="actions-cell">
                                    <button className="edit-button" onClick={() => handleEdit(product._id)}>Editar</button>
                                    <button className="withdraw-button" onClick={() => handleWithdraw(product._id)}>Retirar Itens</button>
                                    <button className="delete-button" onClick={() => handleDelete(product._id)}>Excluir</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>Nenhum produto cadastrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal de Edição */}
            {editingProductId && (
                <div className="modal-content">
                    <button className="close-button" onClick={handleCloseModal}>Fechar</button>
                    <EditProduct productId={editingProductId} onClose={handleCloseModal} onUpdate={fetchProducts} />
                </div>
            )}

            {/* Modal de Retirada */}
            {withdrawingProductId && (
                <div className="modal-content">
                    <button className="close-button" onClick={handleCloseModal}>Fechar</button>
                    <WithdrawProduct productId={withdrawingProductId} onClose={handleCloseModal} onWithdraw={fetchProducts} />
                </div>
            )}
        </div>
    );
}

export default Stock;
