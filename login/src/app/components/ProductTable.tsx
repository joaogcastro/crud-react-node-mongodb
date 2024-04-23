import React from 'react';
import styles from './ProductTable.module.css';

interface Product {
    id:number;
    name: string;
    size: number;
    quantity: number;
}

interface Props {
    products: Product[];
}

const ProductTable: React.FC<Props> = ({ products }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.productTable}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Tamanho</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.size}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
};

export default ProductTable;
