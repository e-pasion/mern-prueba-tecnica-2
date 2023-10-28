import AREA from "../models/area.js";
import EMPLEADO from "../models/empleado.js"
import ROL from "../models/rol.js";

export const getEmpleados = async (req, res) => {
    try {
      const empleados = await EMPLEADO.findAll({
        include: [
          { model: AREA, as: 'area' }, 
          { model: ROL, as: 'roles' }, 
        ],
      });
  
      res.json(empleados);
    } catch (e) {
      console.error("Error obteniendo los empleados", e.message);
      res.status(500).json({ error: e.message });
    }
  };

  export const getEmpleado = async (req, res) => {
    try {
      const empleado = await EMPLEADO.findByPk(req.params.id, {
        include: [
          { model: AREA, as: 'area' }, 
          { model: ROL, as: 'roles' }, 
        ],
      });
      if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
      res.json(empleado);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };


export const createEmpleado=async(req,res)=>{
    try {
        const {nombre,email,sexo,boletin,descripcion,rolesId,areaId}=req.body;
        const empleado= await EMPLEADO.create({
            nombre,
            email,
            sexo,
            boletin,
            descripcion,
            areaId
        })
        const roles = await ROL.findAll({ where: { id: rolesId } });
        await empleado.setRoles(roles);
        res.sendStatus(201);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

export const updateEmpleado = async (req, res) => {
    try {
      const { nombre, email, sexo, boletin, descripcion, rolesId, areaId } = req.body;
      const empleado = await EMPLEADO.findByPk(req.params.id);
  
      if (empleado) {
        await empleado.update({
          nombre,
          email,
          sexo,
          boletin,
          descripcion,
          areaId,
        });
  
        const roles = await ROL.findAll({ where: { id: rolesId } });
        await empleado.setRoles(roles);
  
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: 'Empleado no encontrado' });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  };

export const deleteEmpleado = async (req, res) => {
    try {
      const empleado = await EMPLEADO.findByPk(req.params.id);
      if (empleado) {
        await empleado.removeRoles();
        await empleado.destroy();
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: 'Empleado no encontrado' });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  };