import { Router } from 'express';
import UserController from '../controllers/User.controller';

const router = Router();
const controller = new UserController();

router.post('/', (req, res) => controller.create(req, res));

export default router;
