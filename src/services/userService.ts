import { PrismaClient } from '@prisma/client';
import {
  CreateUserDTO,
  DeleteUserDTO,
  GetUserDTO,
  UpdateUserDTO,
} from '../dtos/userDTO';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
type TokenType = {
  id: string;
};

const prisma = new PrismaClient();

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS) || 10);
  return bcrypt.hashSync(password, salt);
};

const generateToken = ({ id }: TokenType) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET || '', {
    expiresIn: '8h',
  });
  return token;
};

const findUsers = async (): Promise<GetUserDTO[]> => {
  try {
    return await prisma.user.findMany();
  } catch (e) {
    return [];
  }
};

const findUserById = async (id: string): Promise<GetUserDTO | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    return user;
  } catch (e) {
    return null;
  }
};

const findUserByEmail = async (email: string): Promise<GetUserDTO | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  } catch (e) {
    return null;
  }
};

const createUser = async (
  user: CreateUserDTO,
): Promise<CreateUserDTO | {} | null> => {
  const { email, name, password } = user;
  const userExists = await findUserByEmail(email);

  if (userExists) return { message: 'User already exists' };

  try {
    return await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword(password),
        notes: {
          create: user.notes,
        },
      },
    });
  } catch (e) {
    return `Error creating user`;
  }
};

const updateUser = async (
  user: GetUserDTO,
  data: UpdateUserDTO,
): Promise<UpdateUserDTO | null> => {
  const { email, name, password } = data;
  const userExists = await findUserById(user.id);

  if (!userExists) return null;

  try {
    return await prisma.user.update({
      where: { id: user.id },
      data: {
        email: email || user.email,
        name: name || user.name,
        password: hashPassword(String(password)) || user.password,
      },
    });
  } catch (e) {
    return null;
  }
};

const deleteUser = async (id: string): Promise<DeleteUserDTO | null> => {
  const userExists = await findUserById(id);

  if (!userExists) return null;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });
    return { id: deletedUser.id };
  } catch (e) {
    return null;
  }
};

export {
  generateToken,
  findUsers,
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
