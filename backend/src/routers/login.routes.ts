import { Router } from 'express';
import LoginController from '../controllers/Login.controller';
import LoginValidation from '../middlewares/LoginValidation';

const router = Router();
const loginController = new LoginController();

router.post(
  '/login',
  LoginValidation.validateFields,
  (req, res) => loginController.login(req, res)
);

export default router;
