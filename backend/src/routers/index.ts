import { Router } from 'express';
import eventRouter from './event.routes';
import loginRouter from './login.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/events', eventRouter);

router.use(loginRouter)

router.use('/users', userRouter);

export default router;
