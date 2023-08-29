import { Router } from 'express';
import {
  index,
  show,
  store,
  update,
  destroy,
} from '../controllers/noteController';
import { loguinRequired } from '../middlewares/loginRequired';

const router = Router();

router.use(loguinRequired);

router.get('/:userId', index);
router.get('/:userId/:noteId', show);
router.post('/', store);
router.put('/:userId/:noteId', update);
router.delete('/:userId/:noteId', destroy);

export default router;
