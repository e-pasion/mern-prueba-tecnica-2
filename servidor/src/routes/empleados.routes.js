import { Router } from "express";
import { createEmpleado, deleteEmpleado, getEmpleado, getEmpleados, updateEmpleado } from "../controllers/empleado.controller.js";

const router=Router();

router.get("/",getEmpleados);
router.get("/:id",getEmpleado);
router.post("/",createEmpleado);
router.put("/:id",updateEmpleado);
router.delete("/:id",deleteEmpleado);

export default router;