import { Request, Response } from "express";
import { RegisterUserDTO, UserCredentialsDTO, UserRegisterResponse } from "../dto/user.dto";
import { getUserByIdService, getUsersService, loginUserService, registerUserService } from "../services/users.services";
import { User } from "../entities/User.entity";
import { PostgresError } from "../interfaces/Error.interface";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users: User[] = await getUsersService();
    res.status(201).json({
      data: users,
      msg: "Obtener todos los usuarios",
    });
  } catch (error) {
    res.status(400).json({
      msg: error instanceof Error ? error.message : "Error al obtener los usuarios"
    });
  }
};

export const getUserByIdController = async (req: Request<{ id: string }>, res: Response) => {
   try {
    const user: User = await getUserByIdService(+req.params.id);
    res.status(200).json({
     user
    });
  } catch (error) {
    res.status(404).json({
      msg: error instanceof Error ? error.message : "Error al obtener usuario por id"
    });
  }
};

export const registerUserController = async (req: Request<unknown, unknown, RegisterUserDTO>, res: Response): Promise<void> => {
   try {
    const userRegister: UserRegisterResponse = await registerUserService(req.body);
    res.status(201).json({
      data: userRegister,
      msg: "Usuario registrado con exito",
    });
  } catch (error) {
    const err = error as PostgresError;
    res.status(400).json({
      msg: err.detail ? err.detail : error instanceof Error ? error.message : "Error desconocido"
    });
  }
};

export const loginUserController = async (req: Request<unknown, unknown, UserCredentialsDTO>, res: Response) => {
   try {
    res.status(200).json({
      loggin:true,
      user: await loginUserService(req.body)
    });
  } catch (error) {
    res.status(400).json({
      msg: error instanceof Error ? error.message : "Error al loggear el usuario"
    });
  }
};