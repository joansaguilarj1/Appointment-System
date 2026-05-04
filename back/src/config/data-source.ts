import { DataSource } from "typeorm";
import { DB_DATABASE, DB_DROPSCHEMA, DB_HOST, DB_LOGGIN, DB_PASSWORD, DB_SYNCHONIZE, DB_USERNAME } from "./envs";
import { User } from "../entities/User.entity";
import { Credential } from "../entities/Credential.entity";
import { Appointment } from "../entities/Appointment.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  logging: DB_LOGGIN,
  synchronize: DB_SYNCHONIZE,
  dropSchema: DB_DROPSCHEMA,
  entities: ["src/entities/**/*.ts"],
});


