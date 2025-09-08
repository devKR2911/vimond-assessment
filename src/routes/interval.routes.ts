import { Router } from "express";

const router = Router();

import * as intervalController from "@/controllers/interval.controller";
import { validateBody } from "@/validators/interval.validator";

router.post("/", validateBody, intervalController.checkInterval);

export default router;
