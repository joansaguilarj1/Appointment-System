import "dotenv/config";

export const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export const DB_HOST: string = process.env.DB_HOST ? process.env.DB_HOST : "localhost";

export const DB_PORT: number = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;

export const DB_USERNAME: string | undefined = process.env.DB_USERNAME;

export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "13May##" ;

export const DB_DATABASE: string | undefined = process.env.DB_DATABASE;

export const DB_LOGGIN: boolean = process.env.DB_LOGGIN ? process.env.DB_LOGGIN === "true" : false;

export const DB_SYNCHONIZE: boolean = process.env.DB_SYNCHONIZE ? process.env.DB_SYNCHONIZE === "true" : true;

export const DB_DROPSCHEMA: boolean = process.env.DB_DROPSCHEMA ? process.env.DB_DROPSCHEMA === "true" : true;
