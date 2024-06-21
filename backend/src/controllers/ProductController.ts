import { ProductModel } from "../models/ProductModel";

type JsonResponse = {
  message?: string;
  product?: any;
  products?: any[];
  error?: string;
};

export default class ProductController {
  public async create(body: { nameProduct: string; typeProduct: string; quantityProduct: number; priceProduct: number }): Promise<JsonResponse> {
    try {
      const data = new ProductModel(body);
      await data.save();
      return { message: "Product created successfully", product: data };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  public async getAll(): Promise<JsonResponse> {
    try {
      const products = await ProductModel.find();
      return { products }; // Retorna os produtos dentro de um objeto compatível com JsonResponse
    } catch (error: any) {
      return { error: error.message };
    }
  }
  
  public async update(body: { nameProduct?: string; typeProduct?: string; quantityProduct?: number }, id: string): Promise<JsonResponse> {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(id, body, { new: true });
      return { message: "Product updated successfully", product: updatedProduct };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  public async delete(id: string): Promise<JsonResponse> {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(id);
      return { message: "Product deleted successfully", product: deletedProduct };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
