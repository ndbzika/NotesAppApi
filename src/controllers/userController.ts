import { Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  findUserById,
  findUsers,
  updateUser,
} from '../services/userService';

const index = async (req: Request, res: Response) => {
  const users = await findUsers();
  return res.status(200).json(users);
};

const store = async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  if (user === 'Invalid email') return res.status(400).json({ message: user });
  if (user === 'User already exists')
    return res.status(409).json({ message: user });
  if (user === 'Error creating user')
    return res.status(400).json({ message: 'Error creating user' });

  return res.status(201).json(user);
};

const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await findUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await findUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = await updateUser(user, req.body);

  return res.status(200).json(updatedUser);
};

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await findUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const deletedUser = await deleteUser(user.id);

  return res.status(200).json(deletedUser);
};

export { index, store, show, update, destroy };
