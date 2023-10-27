import {DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import EMPLEADO from "./empleado.js";

const ROL=sequelize.define("roles",{
    nombre:{
        type:DataTypes.STRING(255),
        notNull:false
    }
})



export default ROL;