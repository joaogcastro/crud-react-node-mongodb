import { Body, Get, Patch, Delete, Post, Route } from "tsoa"
import { IcecreamModel } from "../models/Icecream"
import { ToppingModel } from "../models/Topping"
import { JsonObject } from "swagger-ui-express"

@Route("api/icecream")
export default class IcecreamController {
  @Post("/create")
  public async create(@Body() body: { name: string }): Promise<string> {
    const data = new IcecreamModel({
      name: body.name,
    })

    try {
      await data.save()
      return "OK"
    } catch (error) {
      return JSON.stringify(error)
    }
  }

  @Get("/getAll")
  public async all(): Promise<JsonObject> {
    try {
      const data = await IcecreamModel.find();
      return data;
    }
    catch (error: any) {
      return {
        error: error.message
      };
    }
  }

  @Patch("/update")
  public async update(@Body() body: { id: string; name: string }): Promise<JsonObject> {
    try {
      const result = await IcecreamModel.findByIdAndUpdate(
        body.id, { name: body.name }
      )

      return { result: result };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }

  @Delete("/delete/:id")
  public async delete(id: string): Promise<JsonObject> {
    try {
      const data = await IcecreamModel.findByIdAndDelete(id)
      return { data: data };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }

  @Get("/getToppings")
  public async allToppings(): Promise<JsonObject> {
    try {
      const data = await ToppingModel.find();
      return data;
    }
    catch (error: any) {
      return {
        error: error.message
      };
    }
  }

  @Get("/fields")
  public async fields(): Promise<JsonObject> {
    try {
      const data = await IcecreamModel.find().select("name toppingId -_id");

      return data;
    }
    catch (error: any) {
      return {
        error: error.message
      };
    }
  }

  @Get("/query")
  public async query(): Promise<JsonObject> {
    try {
      const data = await IcecreamModel.find()
        .populate("toppingId");

      return data;
    }
    catch (error: any) {
      return {
        error: error.message
      };
    }
  }
}
