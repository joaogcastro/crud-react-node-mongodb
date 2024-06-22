import express, { Request, Response } from "express";
import UserController from "../controllers/UserController";
import { Logger } from "../utils/logger";

const logger = new Logger();
const userRoutes = express.Router();
const controller = new UserController();

userRoutes.post("/auth", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const auth = await controller.authenticate(username, password);
        if (auth) {
            logger.info(`Authentication for user ${username} completed`);
            res.status(200).json({ auth: true, message: "Authentication successful" });
        } else {
            logger.error(`Authentication for user ${username} failed`);
            res.status(401).json({ auth: false, message: "Authentication failed" });
        }
    } catch (error) {
        if(error instanceof Error) {
            logger.error(`Error: ${error.message}`);
            return res.status(400).json({ error: error.message });
        } else {
            logger.error("An unknown error occurred");
            return res.status(500).json({ error: "An unknown error occurred." });
        }
    }
});

userRoutes.post("/create", async (req: Request, res: Response) => {
    try {
        const response = await controller.create(req.body);
        logger.info("User created successfully");
        logger.debug(`User created: ${response}`);
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

userRoutes.get("/getAll", async (req: Request, res: Response) => {
    try {
        const response = await controller.getAll();
        logger.info("All Users searched successfully")
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

userRoutes.delete("/delete", async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id;
        const response = await controller.delete(id);
        logger.debug(`Deleted user ${response}`);
        logger.info(`User ID:${id} deleted successfully.`);
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

export { userRoutes };
