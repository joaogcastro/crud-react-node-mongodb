import { ProductModel } from "../models/ProductModel";
import { Logger } from "../utils/logger";

const logger = new Logger();

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
  
  public async update(body: { nameProduct?: string; typeProduct?: string; quantityProduct?: number, priceProduct?: number }, id: string): Promise<JsonResponse> {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(id, body, { new: true });
      return { message: "Product updated successfully", product: updatedProduct };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  public async updateQuantity(body: {productId: string, quantity: number, method: string}): Promise<JsonResponse> {
    try {
      const existingProduct = await ProductModel.findById(body.productId);
      logger.debug(`Product before edit: ${existingProduct}`);

    if (!existingProduct) {
      logger.error(`Product not found with ID: ${body.productId}`);
      return { error: `Product not found with ID: ${body.productId}` };
    }

    if( body.method === "+") {
      existingProduct.quantityProduct += body.quantity;

    } else if ( body.method === "-") {
      if (existingProduct.quantityProduct < body.quantity) {
        logger.error(`Insufficient stock for Product ID: ${body.productId}`);
        return { error: `Insufficient stock for Product ID: ${body.productId}` };
      }
      existingProduct.quantityProduct -= body.quantity;

    } else {
      logger.error("Invalid Method for UpdateQuantity");
      return { error: "Invalid Method for UpdateQuantity" };
    }

    logger.debug(`Updated Product after UpdateQuantity: ${existingProduct}`);
    const updatedProduct = await existingProduct.save();

    return { message: "Success"};

    } catch (error: any) {
      logger.error(`Database Error: ${error}`)
      return { error: `Database Error: ${error}` };
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

  public async search(body: {filterType: string, searchTerm: string}): Promise<JsonResponse> {
    try{
      let filter, isNumber = false;
      const value = body.searchTerm;

      switch(body.filterType) {
        case 'name':
          filter = 'nameProduct';
          break;
        case 'type':
          filter = 'typeProduct';
          break;
        case 'quantity':
          filter = 'quantityProduct';
          isNumber = true;
          break;
        case 'price':
          filter = 'priceProduct';
          isNumber = true;
          break;
        default:
          return { error: 'Invalid Filter Type'};
      }

      if(isNumber === true) {
        const products = await ProductModel.find({ [filter]: [value] }).exec();
        return { products };
      }

      const products = await ProductModel.find({ [filter]: new RegExp(value, 'i') }).exec();
      return { products } ;

    } catch (error: any) {
      return { error: error.message };
    }
  }
}
