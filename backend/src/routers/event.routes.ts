import { Router } from 'express';
import EventController from '../controllers/Event.controller';
import TokenValidation from '../middlewares/TokenValidation';

const controller = new EventController();
const router = Router();

router.get(
  '/',
  TokenValidation.validate,
  (req, res) => controller.getAll(req, res),
);

router.get(
  '/:id',
  TokenValidation.validate,
  (req, res) => controller.getById(req, res),
);

router.post('/', (req, res) => controller.create(req, res));

export default router;
