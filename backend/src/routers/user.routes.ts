import { Router } from 'express';
import UserController from '../controllers/User.controller';
import UserValidation from '../middlewares/UserValidation';
import TokenValidation from '../middlewares/TokenValidation';

const router = Router();
const middleware = new UserValidation();
const tokenMiddleware = new TokenValidation();
const controller = new UserController();

router.post(
  '/',
  (req, res, next) => middleware.validateCreation(req, res, next),
  (req, res) => controller.create(req, res),
);

router.delete(
  '/',
  (req, res, next) => tokenMiddleware.validate(req, res, next),
  (req, res) => controller.deleteUser(req, res),
);

export default router;
