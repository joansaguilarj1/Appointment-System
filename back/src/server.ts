import express, { Application } from "express";
import routes from "./routes";
import cors from "cors";
import morgan from "morgan"

const server: Application = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"))
server.use(routes);
export default server;
