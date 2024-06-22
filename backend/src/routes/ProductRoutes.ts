import express, { Request, Response } from "express";
import ProductController from "../controllers/ProductController";
import { ProductModel } from "../models/ProductModel";
import { Logger } from "../utils/logger";

const logger = new Logger();
const productRoutes = express.Router();
const controller = new ProductController();

productRoutes.post("/create", async (req: Request<any, any, { nameProduct: string; typeProduct: string; quantityProduct: number, priceProduct: number }>, res: Response) => {
  try {
    const response = await controller.create(req.body);
    logger.info("Product created successfully");
    logger.debug(`Product created: ${response}`);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error: ${error.message}`);
      return res.status(400).json({ error: error.message });
    } else {
      logger.error("An unknown error occurred");
      return res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

productRoutes.get("/getAll", async (req: Request, res: Response) => {
  try {
    const response = await controller.getAll();
    logger.info("All Products searched successfully")
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error: ${error.message}`);
      return res.status(400).json({ error: error.message });
    } else {
      logger.error("An unknown error occurred");
      return res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

productRoutes.put("/update/", async (req: Request, res: Response) => {
  try {
    const id: string = req.body.productId;
    const { nameProduct, typeProduct, quantityProduct, priceProduct } = req.body;

    const existingProduct = await ProductModel.findById(id);
    logger.debug(`Product before update ${existingProduct}`);

    if (!existingProduct) {
      logger.error(`Product not found with ID: ${id}`);
      return res.status(404).json({ error: "Product not found" });
    }
    if (nameProduct !== null) {
      logger.debug("Product name will be updated");
      existingProduct.nameProduct = nameProduct;
    }
    if (typeProduct !== null) {
      logger.debug("Product type will be updated");
      existingProduct.typeProduct = typeProduct;
    }
    if (quantityProduct !== null) {
      logger.debug("Product quantity will be updated");
      existingProduct.quantityProduct = quantityProduct;
    }
    if (priceProduct !== null) {
      logger.debug("Product price will be updated");
      existingProduct.priceProduct = priceProduct;
    }

    logger.debug(`Updated Product: ${existingProduct}`);
    const updatedProduct = await existingProduct.save();

    logger.info("Product updated successfully");
    return res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error: ${error.message}`);
      return res.status(400).json({ error: error.message });
    } else {
      logger.error("An unknown error occurred");
      return res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

productRoutes.delete("/delete", async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const response = await controller.delete(id);
    logger.debug(`Deleted user ${response}`);
    logger.info(`Product ID:${id} deleted successfully.`);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error: ${error.message}`);
      return res.status(400).json({ error: error.message });
    } else {
      logger.error("An unknown error occurred");
      return res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

productRoutes.post("/search", async (req: Request, res: Response) => {
  try{
    const response = await controller.search(req.body);
    
    if (response.error) {
      logger.error(`Error in search: ${response.error}`);
      return res.status(500).json({ error: response.error });
    }

    if (response.products?.length === 0) {
      logger.info("No products found");
      return res.status(404).json({ message: "No products found" });
    }

    logger.info("Products searched successfully");
    return res.status(200).json(response);
    
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error: ${error.message}`);
      return res.status(400).json({ error: error.message });
    } else {
      logger.error("An unknown error occurred");
      return res.status(500).json({ error: "An unknown error occurred." });
    }
  }
})

export { productRoutes };
