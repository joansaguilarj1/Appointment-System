import { AppDataSource } from "./config/data-source";
import { PORT } from "./config/envs";
import server from "./server";
import "reflect-metadata";

AppDataSource.initialize()
  .then(() => {
    console.log("Conexion a la base de datos realizada con exito");
    server.listen(PORT, () => {
      console.log(`server listen on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
