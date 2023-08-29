import { CreateNotesDTO, GetNotesDTO, UpdateNotesDTO } from './notesDTO';

export interface CreateUserDTO {
  name: string | null;
  email: string;
  password: string;
  notes?: CreateNotesDTO[];
}

export interface UpdateUserDTO {
  name?: string | null;
  email?: string;
  password?: string;
  notes?: UpdateNotesDTO[];
}

export interface GetUserDTO {
  id: string;
  name: string | null;
  email: string;
  password: string;
  notes?: GetNotesDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteUserDTO {
  id: string;
}
