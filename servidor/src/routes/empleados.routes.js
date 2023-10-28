import { Router } from "express";
import { createEmpleado, deleteEmpleado, getEmpleado, getEmpleados, updateEmpleado } from "../controllers/empleado.controller.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { empleadoSchema } from "../schema/empleado.schema.js";

const router=Router();

router.get("/",getEmpleados);
router.get("/:id",getEmpleado);
router.post("/", validateSchema(empleadoSchema) ,createEmpleado);
router.put("/:id",validateSchema(empleadoSchema) ,updateEmpleado);
router.delete("/:id",deleteEmpleado);

export default router;