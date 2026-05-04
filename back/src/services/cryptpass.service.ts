import bcrypt from "bcrypt";

const SALT_ROUNDS = 8;

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hashedPassword;
};

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};