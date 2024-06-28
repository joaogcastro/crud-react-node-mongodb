"use client"; 

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WithdrawProduct: React.FC<{ productId: string, method: string, onClose: () => void, onUpdate: () => void }> = ({ productId, method, onClose, onUpdate }) => {
    const [quantity, setQuantity] = useState<number>(0);

    useEffect(() => {
        setQuantity(0);
    }, [productId, method]);

    const handleUpdateProduct = () => {
        axios.put('http://127.0.0.2:4000/product/updateQuantity/', {
            productId,
            quantity,
            method
        })
        .then(response => {
            console.log('Produto atualizado com sucesso:', response.data);
            onUpdate(); 
            onClose(); 
        })
        .catch(error => {
            console.error(`Erro ao ${method === '+' ? 'adicionar' : 'retirar'} produto:`, error);
        });
    };

    return (
        <div className="withdraw-product-container">
            <div className="modal">
                <div className="modal-header">
                    <h2>{method === '+' ? 'Adicionar Produto' : 'Retirar Produto'}</h2>
                    <button className="close-button" onClick={onClose}>Fechar</button>
                </div>
                <form className="withdraw-product-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Quantidade:</label>
                        <input 
                            type="number" 
                            value={quantity} 
                            onChange={(e) => setQuantity(Number(e.target.value))} 
                        />
                    </div>
                    <div className="button-group">
                        <button className="withdraw-button" onClick={handleUpdateProduct}>{method === '+' ? 'Adicionar Produto' : 'Retirar Produto'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WithdrawProduct;
