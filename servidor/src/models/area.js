import {DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

import EMPLEADO from "./empleado.js";

const AREA= sequelize.define('areas',{
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
export default AREA;