import { Router } from "express";
import eventRouter from './event.routes';

const router = Router();

router.use('/events', eventRouter);

export default router;
