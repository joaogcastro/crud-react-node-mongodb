import express, { Request, Response } from "express";
import UserController from "../controllers/UserController";

const userRoutes = express.Router();
const controller = new UserController();

userRoutes.post("/auth", async (req: Request<any, any, { username: string; password: string; email: string }>, res: Response) => {
    try {
        const auth = await controller.authenticate(req.body);
        if (auth) {
            res.status(200).json({ auth: true, message: "Authentication successful" });
        } else {
            res.status(401).json({ auth: false, message: "Authentication failed" });
        }
    } catch (error) {
        if(error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(500).json({ error: "An unknown error occurred." });
        }
    }
})

userRoutes.post("/create", async (req: Request<any, any, { username: string; password: string; email: string }>, res: Response) => {
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

userRoutes.get("/getAll", async (req: Request, res: Response) => {
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

export { userRoutes };