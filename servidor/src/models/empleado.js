import {DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { createRelaciones } from "../config/relaciones.js";

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




export default EMPLEADO;