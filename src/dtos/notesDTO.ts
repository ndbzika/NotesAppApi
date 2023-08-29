export interface CreateNotesDTO {
  title: string;
  content: string;
  userId: string;
}

export interface GetNotesDTO {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateNotesDTO {
  title?: string;
  content?: string;
}

export interface DeleteNotesDTO {
  id: string;
}
