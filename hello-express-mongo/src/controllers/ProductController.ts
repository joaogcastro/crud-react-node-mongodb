import { Body, Get, Patch, Delete, Post, Route } from "tsoa";
import { ProductModel } from "../models/ProductModel"; // Alterei para ProductModel
import { JsonObject } from "swagger-ui-express";

@Route("api/icecream")
export default class ProductController {
  @Post("/create")
  public async create(@Body() body: { toppingId: string; nameProduct: string; typeProduct: string; quantityProduct: number }): Promise<JsonObject> {
    try {
      const data = new ProductModel(body); // Alterei para ProductModel
      await data.save();
      return { message: "Product created successfully", product: data };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  @Get("/getAll")
  public async getAll(): Promise<JsonObject> {
    try {
      const products = await ProductModel.find();
      return products; // Retorna diretamente os produtos
    } catch (error: any) {
      return { error: error.message };
    }
  }
  

  @Patch("/update/{id}")
  public async update(@Body() body: { nameProduct?: string; typeProduct?: string; quantityProduct?: number }, id: string): Promise<JsonObject> {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(id, body, { new: true }); // Alterei para ProductModel
      return { message: "Product updated successfully", product: updatedProduct };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  @Delete("/delete/{id}")
  public async delete(id: string): Promise<JsonObject> {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(id); // Alterei para ProductModel
      return { message: "Product deleted successfully", product: deletedProduct };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
