import { Router } from 'express';
import eventRouter from './event.routes';
import loginRouter from './login.routes';

const router = Router();

router.use('/events', eventRouter);

router.use(loginRouter)

export default router;
