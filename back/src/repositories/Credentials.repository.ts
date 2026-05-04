import { Credential } from "../entities/Credential.entity";
import { AppDataSource } from "../config/data-source";


export const CredentialModel = AppDataSource.getRepository(Credential);
