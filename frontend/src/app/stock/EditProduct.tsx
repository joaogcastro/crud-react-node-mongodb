"use client"; 

import React, { useState } from 'react';
import axios from 'axios';

interface Product {
    _id: string;
    nameProduct: string;
    typeProduct: string;
    quantityProduct: number;
    priceProduct: number;
}

const EditProduct: React.FC<{ productId: string, onClose: () => void, onUpdate: () => void }> = ({ productId, onClose, onUpdate }) => {
    const [xnameProduct, setNameProduct] = useState<string>('');
    const [xtypeProduct, setTypeProduct] = useState<string>('');
    const [xpriceProduct, setPriceProduct] = useState<string>('');

    const handleUpdateProduct = () => {
        
        let nameProduct = null, typeProduct = null, priceProduct = null;
        if (xnameProduct !== '') { nameProduct = xnameProduct }
        if (xtypeProduct !== '') { typeProduct = xtypeProduct }
        if (xpriceProduct !== '') { priceProduct = xpriceProduct }

        axios.put('http://127.0.0.2:4000/product/update/', {
            productId,
            nameProduct,
            typeProduct,
            priceProduct
        })
            .then(response => {
                console.log('Produto atualizado com sucesso:', response.data);
                onUpdate(); 
                onClose(); 
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
                            value={xnameProduct}
                            onChange={(e) => setNameProduct(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tipo do Produto:</label>
                        <input
                            type="text"
                            value={xtypeProduct}
                            onChange={(e) => setTypeProduct(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Preço:</label>
                        <input
                            type="text"
                            value={xpriceProduct}
                            onChange={(e) => setPriceProduct(e.target.value)}
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
