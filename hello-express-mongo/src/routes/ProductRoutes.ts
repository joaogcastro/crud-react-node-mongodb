import express, { Request, Response } from "express";
import ProductController from "../controllers/ProductController";
import { ProductModel } from "../models/ProductModel";

const router = express.Router();
const controller = new ProductController();

router.post("/create", async (req: Request<any, any, { toppingId: string; nameProduct: string; typeProduct: string; quantityProduct: number }>, res: Response) => {
  try {
    const response = await controller.create(req.body);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

router.get("/getAll", async (req: Request, res: Response) => {
  try {
    const response = await controller.getAll();
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

router.patch("/update/:id", async (req: Request<{ id: string }, any, { nameProduct?: string; typeProduct?: string; quantityProduct?: number }>, res: Response) => {
  try {
    const id: string = req.params.id;
    const { nameProduct, typeProduct, quantityProduct } = req.body;

    // Encontre o produto pelo ID
    const existingProduct = await ProductModel.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Atualize apenas os campos fornecidos
    if (nameProduct !== undefined) {
      existingProduct.nameProduct = nameProduct;
    }
    if (typeProduct !== undefined) {
      existingProduct.typeProduct = typeProduct;
    }
    if (quantityProduct !== undefined) {
      existingProduct.quantityProduct = quantityProduct;
    }

    // Salve o produto atualizado
    const updatedProduct = await existingProduct.save();

    return res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

router.delete("/delete/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id: string = req.params.id;
    const response = await controller.delete(id);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred." });
    }
  }
});

export default router;
