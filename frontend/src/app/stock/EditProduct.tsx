"use client"; // Adicione esta linha no início do arquivo

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stock.css';

interface Product {
    _id: string;
    nameProduct: string;
    typeProduct: string;
    quantityProduct: number;
}

const EditProduct: React.FC<{ productId: string, onClose: () => void }> = ({ productId, onClose }) => {
    const [nameProduct, setNameProduct] = useState<string>('');
    const [typeProduct, setTypeProduct] = useState<string>('');
    const [quantityProduct, setQuantityProduct] = useState<number>(0);

    useEffect(() => {
        // Carregar os dados do produto com base no productId
        axios.get<Product>(`http://127.0.0.2:4000/product/getById/${productId}`)
            .then(response => {
                const product = response.data;
                setNameProduct(product.nameProduct);
                setTypeProduct(product.typeProduct);
                setQuantityProduct(product.quantityProduct);
            })
            .catch(error => {
                console.error('Erro ao carregar produto:', error);
            });
    }, [productId]);

    const handleUpdateProduct = () => {
        // Atualizar o produto no backend
        axios.put(`http://127.0.0.2:4000/product/update/${productId}`, {
            nameProduct,
            typeProduct,
            quantityProduct
        })
        .then(response => {
            console.log('Produto atualizado com sucesso:', response.data);
            onClose(); // Fechar o modal após a atualização
        })
        .catch(error => {
            console.error('Erro ao atualizar produto:', error);
        });
    };

    return (
        <div className="edit-product-container">
            <div className="modal">
                <div className="modal-header">
                    <h2>Editar Produto</h2>
                    <button className="close-button" onClick={onClose}>Fechar</button>
                </div>
                <form className="edit-product-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Nome do Produto:</label>
                        <input 
                            type="text" 
                            value={nameProduct} 
                            onChange={(e) => setNameProduct(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Tipo do Produto:</label>
                        <input 
                            type="text" 
                            value={typeProduct} 
                            onChange={(e) => setTypeProduct(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantidade:</label>
                        <input 
                            type="number" 
                            value={quantityProduct} 
                            onChange={(e) => setQuantityProduct(Number(e.target.value))} 
                        />
                    </div>
                    <div className="button-group">
                        <button className="update-button" onClick={handleUpdateProduct}>Atualizar Produto</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
