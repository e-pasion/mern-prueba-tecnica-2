import ROL from "../models/rol.js";

export const getRoles=async(req,res)=>{
   try {
    const roles=await ROL.findAll();
    res.json(roles);
   } catch (e) {
        console.error("error obteniendo los roles",e.message);
   }
}