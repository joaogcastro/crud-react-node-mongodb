"use client"; // Adicione esta linha no início do arquivo

import React, { useState } from 'react';
import axios from 'axios';

const WithdrawProduct: React.FC<{ productId: string, onClose: () => void, onWithdraw: () => void }> = ({ productId, onClose, onWithdraw }) => {
    const [quantityToWithdraw, setQuantityToWithdraw] = useState<number>(0);

    const handleWithdrawProduct = () => {
        axios.put('http://127.0.0.2:4000/product/withdraw/', {
            productId,
            quantityToWithdraw
        })
        .then(response => {
            console.log('Produto retirado com sucesso:', response.data);
            onWithdraw(); // Atualizar a lista de produtos após a retirada
            onClose(); // Fechar o modal após a retirada
        })
        .catch(error => {
            console.error('Erro ao retirar produto:', error);
        });
    };

    return (
        <div className="withdraw-product-container">
            <div className="modal">
                <div className="modal-header">
                    <h2>Retirar Produto</h2>
                    <button className="close-button" onClick={onClose}>Fechar</button>
                </div>
                <form className="withdraw-product-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Quantidade a retirar:</label>
                        <input 
                            type="number" 
                            value={quantityToWithdraw} 
                            onChange={(e) => setQuantityToWithdraw(Number(e.target.value))} 
                        />
                    </div>
                    <div className="button-group">
                        <button className="withdraw-button" onClick={handleWithdrawProduct}>Retirar Produto</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WithdrawProduct;
