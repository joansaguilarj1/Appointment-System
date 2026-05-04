import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  console.log(token);
  if (token === "autenticado") next();
  else res.status(400).json({ message: "Falta auth" });
};

export default auth;
