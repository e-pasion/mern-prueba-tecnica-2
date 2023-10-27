import {DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import AREA from "./area.js";
import ROL from "./rol.js";

const EMPLEADO= sequelize.define("empleados",{
    nombre:{
        type:DataTypes.STRING(255),
        notNull:false
    },
    email:{
        type:DataTypes.STRING(255),
        notNull:false
    },
    sexo:{
        type:DataTypes.STRING(1),
        notNull:false
    },
    boletin:{
        type:DataTypes.BOOLEAN,
        notNull:false,
        defaultValue:false
    },
    descripcion:{
        type:DataTypes.TEXT,
        notNull:false
    }
})
EMPLEADO.belongsTo(AREA);
AREA.hasOne(EMPLEADO);


EMPLEADO.belongsToMany(ROL, {
    through: "empleado_rol",
    as: "roles",
    foreignKey: "rol_id",
  });

  ROL.belongsToMany(EMPLEADO, {
    through: "empleado_rol",
    as: "empleados",
    foreignKey: "empleado_id",
  });

export default EMPLEADO;