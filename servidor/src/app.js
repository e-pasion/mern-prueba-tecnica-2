import express from "express"
import {dbConnect} from "./config/db.js";
import empleadoRoutes from './routes/empleados.routes.js'
const app=express();
const PORT=3000;
const route="/api"
app.use(express.json());
app.use(route,empleadoRoutes)

app.listen(PORT,()=>{
    console.log(`server start on: http://localhost:${PORT}`);
    dbConnect();
})