import AREA from "../models/area.js";
import EMPLEADO from "../models/empleado.js";
import ROL from "../models/rol.js";

export const createRelaciones = async () => {
    try {
        AREA.hasOne(EMPLEADO);
        EMPLEADO.belongsTo(AREA);
    
      EMPLEADO.belongsToMany(ROL, {
        through: "empleado_rol",
        as: "roles",
        foreignKey: "empleado_id",
      });
    
      ROL.belongsToMany(EMPLEADO, {
        through: "empleado_rol",
        as: "empleados",
        foreignKey: "rol_id",
      });
      console.log(">creando relaciones...");
        
    } catch (e) {
        console.log(e);
        
    }

};
