import { Router } from 'express';
import eventRouter from './event.routes';
import LoginController from '../controllers/Login.controlle';

const router = Router();
const loginController = new LoginController();

router.use('/events', eventRouter);

router.post('/login', (req, res) => loginController.login(req, res));

export default router;
