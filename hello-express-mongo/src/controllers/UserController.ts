import { Body, Get, Patch, Delete, Post, Route } from "tsoa";
import { UserModel } from "../models/UserModel";
import { JsonObject } from "swagger-ui-express";

export default class UserController {
    @Post("/auth")
    public async authenticate(body: { username: string; password: string; email: string }): Promise<boolean> {
        try {
            const userToBeAuth = new UserModel(body);
            if(!userToBeAuth.username) {
                return false;
            }
            const userFinded = await UserModel.findOne({ username: userToBeAuth.username });

            if (userToBeAuth.password === userFinded?.password) {
                return true;
            } else {
                return false;
            }
        } catch (error: any) {
            console.error(error.message);
            return false;
        }
    }
    
    @Post("/create")
    public async create(@Body() body: { username: string; password: string; email: string }): Promise<JsonObject> {
        try {
            const data = new UserModel(body);
            await data.save();
            return { message: "User created successfully", user: data };
        } catch (error: any) {
            return { error: error.message };
        }
    }

    @Get("/getAll")
    public async getAll(): Promise<JsonObject> {
        try {
            const users = await UserModel.find();
            return { users };
        } catch (error: any) {
            return { error: error.message };
        }
    }
}