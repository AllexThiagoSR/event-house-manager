import { Router } from 'express';
import EventController from '../controllers/Event.controller';
import TokenValidation from '../middlewares/TokenValidation';

const controller = new EventController();
const tokenMiddleware = new TokenValidation();
const router = Router();

router.get(
  '/',
  (req, res, next) => tokenMiddleware.validate(req, res, next),
  (req, res) => controller.getAll(req, res),
);

router.get(
  '/:id',
  (req, res, next) => tokenMiddleware.validate(req, res, next),
  (req, res) => controller.getById(req, res),
);

router.post('/', (req, res) => controller.create(req, res));

router.post(
  '/:id/invite/:userId',
  (req, res, next) => tokenMiddleware.validate(req, res, next),
  (req, res, next) => tokenMiddleware.validatePermission(req, res, next),
  (req, res) => controller.invite(req, res),
);

export default router;
