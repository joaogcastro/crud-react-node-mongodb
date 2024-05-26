import express, { Express, Request, Response } from "express"
import swaggerUi from "swagger-ui-express"
import { connect } from "./service/database"
import dotenv from "dotenv"
import { productRoutes } from "./routes/ProductRoutes"

dotenv.config();
const app: Express = express()
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const hostname = process.env.HOSTNAME || 'localhost';
const databaseUrl = process.env.DATABASE_URL || "";

connect(databaseUrl)

app.use(express.json());
app.use(express.static("public"));
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use("/product", productRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server")
});

app.listen(port, hostname, () => {
  console.log(`Server Started at ${hostname}:${port}`)
});
