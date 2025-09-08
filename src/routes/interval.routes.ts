import { Router } from "express";

const router = Router();

import * as intervalController from "../controllers/interval.controller";

router.post("/", intervalController.checkInterval);

export default router;
