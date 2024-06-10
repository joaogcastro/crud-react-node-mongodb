import express, { Express, Request, Response } from "express"
import swaggerUi from "swagger-ui-express"
import { connect } from "./service/database"
import dotenv from "dotenv"
import { userRoutes } from "./routes/UserRoutes"
import { productRoutes } from "./routes/ProductRoutes"
import cors from "cors";

dotenv.config();
const app: Express = express()
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const hostname = process.env.HOSTNAME || 'localhost';
const databaseUrl = process.env.DATABASE_URL || "";

connect(databaseUrl)

const allowedOrigins = ['http://localhost:3000', '127.0.0.2:4000', 'http://localhost:5173'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());
app.use(express.static("public"));

app.use("/user", userRoutes);
app.use("/product", productRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server")
});

app.listen(port, hostname, () => {
  console.log(`Server Started at ${hostname}:${port}`)
});
