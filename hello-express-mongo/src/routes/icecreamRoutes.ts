import express, { Request, Response } from "express"
import IcecreamController from "../controllers/IcecreamController"

const router = express.Router()
const controller = new IcecreamController()

router.post("/create", async (req: Request, res: Response) => {
  const response = await controller.create(req.body)

  return res.status(response === "OK" ? 200 : 400).send(response)
})

router.get("/getAll", async (req: Request, res: Response) => {
  const response = await controller.all()

  return res.status(response.error ? 400 : 200).send(response)
})

router.patch("/update", async (req: Request, res: Response) => {
  const response = await controller.update(req.body)

  return res.status(response.error ? 400 : 200).send(response)
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const response = await controller.delete(req.params.id)

  return res.status(response.error ? 400 : 200).send(response)
})

router.get("/getToppings", async (req: Request, res: Response) => {
  const response = await controller.allToppings()

  return res.status(response.error ? 400 : 200).send(response)
})


router.get("/query", async (req: Request, res: Response) => {
  const response = await controller.query()

  return res.status(response.error ? 400 : 200).send(response)
})

router.get("/fields", async (req: Request, res: Response) => {
  const response = await controller.fields()

  return res.status(response.error ? 400 : 200).send(response)
})

export default router
