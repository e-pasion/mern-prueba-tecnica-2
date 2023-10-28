import AREA from "../models/area.js";

export const getAreas=async(req,res)=>{
   try {
    const areas=await AREA.findAll();
    res.json(areas);
   } catch (e) {
        console.error("error obteniendo las areas",e.message);
   }
}