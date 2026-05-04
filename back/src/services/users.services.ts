import { LoginResponse, RegisterUserDTO, UserLoginDTO, UserRegisterResponse } from "../dto/user.dto";
import { checkCredentials, createCredentialService } from "./credentials.service";
import { User } from "../entities/User.entity";
import { UserModel } from "../repositories/User.repository";
import { Credential } from "../entities/Credential.entity";
import { AppDataSource } from "../config/data-source";

export const getUsersService = async (): Promise<User[]> => {
  const allUsers = await UserModel.find();
  return allUsers;
};

export const getUserByIdService = async (id: number): Promise<User> => {
  const userFound: User | null = await UserModel.findOne({
    where: { id },
    relations: ["appointments"],
  });
  if (!userFound) throw new Error(`El usuario con id ${id} no fue encontrado`);
  return userFound;
};

export const registerUserService = async (user: RegisterUserDTO): Promise<UserRegisterResponse> => {
  
  const transactionResult = await AppDataSource.transaction(
    async (entityManager) => {
      const credentialCreated: Credential = await createCredentialService(
        entityManager,
        user.username,
        user.password
      );

      const newUser: User = entityManager.create(User, {
        birthdate: new Date(user.birthdate),
        email: user.email,
        name: user.name,
        nDni: user.nDni,
        credential: credentialCreated,
      });
      await entityManager.save(newUser);

      return newUser;
    }
  );

  return {
    name: transactionResult.name,
    email: transactionResult.email,
  };
};

export const loginUserService =  async(user: UserLoginDTO) => {

  const credentialId: number =  await checkCredentials(user.username, user.password);
  const userFound: User | null = await UserModel.findOne({
    where: {
      id: credentialId
    }
  })

  return {
    id: userFound?.id,
    name: userFound?.name,
    email: userFound?.email,
    birthdate: userFound?.birthdate,
    nDni: userFound?.birthdate
  }
}
