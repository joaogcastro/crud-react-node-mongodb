"use client"; // Adicione esta linha no início do arquivo

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './Stock.css';
import EditProduct from './EditProduct'; // Importe o componente EditProduct

interface Product {
    _id: string;
    nameProduct: string;
    typeProduct: string;
    quantityProduct: number;
}

const Stock: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [editingProductId, setEditingProductId] = useState<string | null>(null); // Estado para controlar o ID do produto em edição
    const router = useRouter(); // Hook para manipulação de navegação

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get<Product[]>('http://127.0.0.2:4000/product/getAll')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
            });
    };

    const handleEdit = (productId: string) => {
        setEditingProductId(productId); // Define o ID do produto que será editado
    };

    const handleDelete = (productId: string) => {
        axios.delete(`http://127.0.0.2:4000/product/delete/${productId}`)
            .then(response => {
                console.log('Produto excluído com sucesso:', response.data);
                fetchProducts(); // Atualiza a lista de produtos após a exclusão
            })
            .catch(error => {
                console.error('Erro ao excluir produto:', error);
            });
    };

    const handleCloseModal = () => {
        setEditingProductId(null); // Fecha o modal de edição
    };

    const handleBack = () => {
        router.push('/menu'); // Redireciona para a página do menu
    };

    const filteredProducts = products.filter(product =>
        product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="stock-container">
            <div className="search-bar-container">
                <button className="back-button" onClick={handleBack}>Voltar</button>
                <input
                    type="text"
                    placeholder="Pesquisar produto..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Nome do Produto</th>
                        <th>Tipo do Produto</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product._id}>
                            <td>{product.nameProduct}</td>
                            <td>{product.typeProduct}</td>
                            <td>{product.quantityProduct}</td>
                            <td className="actions-cell">
                                <button className="edit-button" onClick={() => handleEdit(product._id)}>Editar</button>
                                <button className="delete-button" onClick={() => handleDelete(product._id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Edição */}
            {editingProductId && (
                <div className="modal-background">
                    <div className="modal-content">
                        <button className="close-button" onClick={handleCloseModal}>Fechar</button>
                        <EditProduct productId={editingProductId} onClose={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Stock;
