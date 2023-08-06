import { Router } from "express";
import EventController from "../controllers/Event.controller";

const controller = new EventController();
const router = Router();

router.get('/', (req, res) => controller.getAll(req, res));

router.post('/', (req, res) => controller.create(req, res));

export default router;
