import EMPLEADO from "../models/empleado.js"

export const getEmpleados=async(req,res)=>{
   try {
    const empleados=EMPLEADO.findAll();
    res.json(empleados);
   } catch (e) {
        console.error("error obteniendo los usuarios",e.message);
   }
}