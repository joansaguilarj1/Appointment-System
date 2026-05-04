import { comparePassword, hashPassword } from "./cryptpass.service";
import { Credential } from "../entities/Credential.entity";
import { CredentialModel } from "../repositories/Credentials.repository";
import { EntityManager } from "typeorm";

const checkUserNameExist = async (username :  string) => {
    const credentialFound : Credential | null =  await CredentialModel.findOneBy({username})
    if(credentialFound) throw Error(`El username ${username} ya se encuentra en uso`);
}

export const checkCredentials = async(username: string, password: string) : Promise<number> => {

  const credetialFound: Credential | null = await CredentialModel.findOne({
    where: {
      username,
    }
  })

  if(!(credetialFound && await comparePassword(password, credetialFound.password))) throw new Error("Credenciales incorrectas")
  return credetialFound.id;

};

export const createCredentialService = async(entityManager: EntityManager, username: string, password: string): Promise<Credential> => {
  await checkUserNameExist(username);
  const newCredential: Credential =  await entityManager.create(Credential, {
     username, 
     password: await hashPassword(password)
  });
  await entityManager.save(newCredential);
  return newCredential;
};
