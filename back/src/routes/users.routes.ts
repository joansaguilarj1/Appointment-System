import { Request, Response, Router } from "express";
import { getUsersController, getUserByIdController, registerUserController, loginUserController } from "../controllers/users.controller"
import { RegisterUserDTO, UserCredentialsDTO } from "../dto/user.dto";

const usersRouter = Router();

usersRouter.get("/", (req: Request, res: Response) => getUsersController(req, res));
usersRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => getUserByIdController(req, res));
usersRouter.post("/register", (req: Request< unknown, unknown, RegisterUserDTO >, res: Response) => registerUserController(req, res));
usersRouter.post("/login", (req: Request< unknown, unknown, UserCredentialsDTO >, res: Response) => loginUserController(req, res));

export default usersRouter;
