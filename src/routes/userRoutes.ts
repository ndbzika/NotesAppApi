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

router.use(loguinRequired);

router.get('/', index);
router.get('/:id', show);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;
