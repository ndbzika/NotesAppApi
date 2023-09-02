import { PrismaClient } from '@prisma/client';
import {
  CreateNotesDTO,
  DeleteNotesDTO,
  GetNotesDTO,
  UpdateNotesDTO,
} from '../dtos/notesDTO';

const prisma = new PrismaClient();

const findNoteById = async (
  id: string,
  userId: string,
): Promise<GetNotesDTO | null> => {
  try {
    const note = await prisma.notes.findFirst({
      where: { id: id, userId: userId },
    });
    return note;
  } catch (e) {
    return null;
  }
};

const findNotesByUserId = async (userId: string): Promise<GetNotesDTO[]> => {
  try {
    const notes = await prisma.notes.findMany({
      where: { userId: userId },
    });
    return notes;
  } catch (e) {
    return [];
  }
};

const createNote = async (
  note: GetNotesDTO,
  userId: string,
): Promise<CreateNotesDTO | null> => {
  try {
    return await prisma.notes.create({
      data: {
        title: note.title,
        content: note.content,
        userId: userId,
      },
    });
  } catch (e) {
    return null;
  }
};

const updateNote = async (
  id: string,
  userId: string,
  data: UpdateNotesDTO,
): Promise<CreateNotesDTO | null> => {
  const noteExists = await findNoteById(id, userId);

  if (!noteExists) return null;
  try {
    return await prisma.notes.update({
      where: { id: id },
      data: {
        title: data.title || noteExists.title,
        content: data.content || noteExists.content,
      },
    });
  } catch (e) {
    return null;
  }
};

const deleteNote = async (
  id: string,
  userId: string,
): Promise<DeleteNotesDTO | null> => {
  const noteExists = await findNoteById(id, userId);

  if (!noteExists) return null;
  try {
    await prisma.notes.delete({
      where: { id: id },
    });
    return { id: noteExists.id };
  } catch (e) {
    return null;
  }
};

export { findNoteById, findNotesByUserId, createNote, updateNote, deleteNote };
