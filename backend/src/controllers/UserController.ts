import { UserModel } from "../models/UserModel";

type JsonResponse = {
    message?: string;
    user?: any;
    users?: any[];
    error?: string;
};

export default class UserController {
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

    public async create(body: { username: string; password: string; email: string }): Promise<JsonResponse> {
        try {
            const data = new UserModel(body);
            await data.save();
            return { message: "User created successfully", user: data };
        } catch (error: any) {
            return { error: error.message };
        }
    }

    public async getAll(): Promise<JsonResponse> {
        try {
            const users = await UserModel.find();
            return { users };
        } catch (error: any) {
            return { error: error.message };
        }
    }

    public async delete(id: string): Promise<JsonResponse> {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(id);
      return { message: "User deleted successfully", user: deletedUser };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}