import { Router } from "express";
import { getAreas } from "../controllers/area.controller.js";

const router=Router();

router.get("/",getAreas);

export default router;