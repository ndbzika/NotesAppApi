import { Request, Response } from 'express';
import {
  createNote,
  deleteNote,
  findNoteById,
  findNotesByUserId,
  updateNote,
} from '../services/notesService';

const index = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const notes = await findNotesByUserId(userId);

  return res.status(200).json(notes);
};

const show = async (req: Request, res: Response) => {
  const { noteId, userId } = req.params;

  const note = await findNoteById(noteId, userId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  return res.status(200).json(note);
};

const store = async (req: Request, res: Response) => {
  const note = await createNote(req.body);

  if (!note) {
    return res.status(400).json({ message: 'Error creating note' });
  }

  return res.status(201).json(note);
};

const update = async (req: Request, res: Response) => {
  const { noteId, userId } = req.params;
  const note = await findNoteById(noteId, userId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  const updatedNote = await updateNote(noteId, userId, req.body);

  return res.status(200).json(updatedNote);
};

const destroy = async (req: Request, res: Response) => {
  const { noteId, userId } = req.params;
  const note = await findNoteById(noteId, userId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  const deletedNote = await deleteNote(noteId, userId);

  return res.status(200).json(deletedNote);
};

export { index, show, store, update, destroy };
