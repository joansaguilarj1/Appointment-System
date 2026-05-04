export interface RegisterUserDTO {
  name: string;
  email: string;
  birthdate: Date;
  nDni: number;
  username: string;
  password: string;
}

export interface UserCredentialsDTO {
  username: string;
  password: string;
}

export interface UserRegisterResponse {
  name: string;
  email: string;
}

export interface GetUsersDTO {
  name: string;
  email: string;
  birthdate: Date;
  username: string;
}

export interface UserLoginDTO {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  birthdate: Date;
  nDni: number;
}
