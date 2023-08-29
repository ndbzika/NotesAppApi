import { Request, Response } from 'express';
import { findUserByEmail, generateToken } from '../services/userService';
import bcrypt from 'bcrypt';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const verifyPass = await bcrypt.compare(password, user.password);

  if (!verifyPass) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = generateToken({ id: user.id });

  const { password: _, ...userWithoutPassword } = user;

  return res.status(200).json({ user: userWithoutPassword, token });
};

export { login };
