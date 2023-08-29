import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findUserById } from '../services/userService';

type JwtPayload = {
  id: string;
};

export const loguinRequired = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const [, token] = authorization.split(' ');

  const { id } = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;

  const user = await findUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { password: _, ...userWithoutPassword } = user;

  req.user = userWithoutPassword;

  next();
};
