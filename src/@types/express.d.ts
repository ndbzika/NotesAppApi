import { GetUserDTO } from '../dtos/userDTO';

declare global {
  namespace Express {
    export interface Request {
      user?: Partial<GetUserDTO>;
    }
  }
}
