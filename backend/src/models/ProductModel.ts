import mongoose, { Document } from "mongoose";

// Definindo a interface para o modelo de produto
export interface Product extends Document {
  nameProduct: string;
  typeProduct: string;
  quantityProduct: number;
  priceProduct: number;
}

// Definindo o modelo de produto com base no esquema fornecido
export const ProductModel = mongoose.model<Product>("Product", new mongoose.Schema<Product>({
  nameProduct: {
    type: String,
    required: true,
  },
  typeProduct: {
    type: String,
    required: true,
  },
  quantityProduct: {
    type: Number,
    required: true,
  },
  priceProduct: {
    type: Number,
    required: true,
  }
}));
