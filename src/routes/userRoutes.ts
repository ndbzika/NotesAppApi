import { Router } from 'express';
import {
  destroy,
  index,
  show,
  store,
  update,
} from '../controllers/userController';
import { loguinRequired } from '../middlewares/loginRequired';

const router = Router();

router.post('/signup', store);

router.use(loguinRequired);

router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;
