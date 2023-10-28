import express from "express"
import {dbConnect} from "./config/db.js";
import empleadoRoutes from './routes/empleados.routes.js'
import rolRoutes from './routes/rol.routes.js'
import areaRoutes from './routes/area.routes.js'
import { verificarAreas, verificarRoles } from "./config/setup.js";
import { createRelaciones } from "./config/relaciones.js";
import cors from 'cors'
import morgan from 'morgan'
const app=express();
const PORT=3000;
const route="/api/"
app.use(express.json());
app.use(cors())
app.use(morgan('dev'));
app.use(`${route}empleado`,empleadoRoutes)
app.use(`${route}rol`,rolRoutes)
app.use(`${route}area`,areaRoutes)


app.listen(PORT,async()=>{
    await createRelaciones();
    await dbConnect();
    await verificarAreas();
    await verificarRoles();
    console.log(`server start on: http://localhost:${PORT}`);
});
