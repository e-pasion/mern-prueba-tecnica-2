import AREA from "../models/area.js";
import ROL from "../models/rol.js"

export const verificarRoles= async()=>{
    try {
        const roles= await ROL.findAll();
        if(roles.length<1){
            console.log(">Creando roles...");
            const rolesIniciales = [
                { nombre: 'Profesional de proyectos' },
                { nombre: 'Gerente estrategico' },
                { nombre: 'Desarrollador'},
                { nombre: 'Auxiliar administrativo'}
              ];
              await ROL.bulkCreate(rolesIniciales);        
              console.log("Roles creados");
        }
    } catch (e) {
        console.log("Hubo un error al crear los roles",e);
    }

}

export const verificarAreas= async()=>{
    try {
        const areas= await AREA.findAll();
        if(areas.length<1){
            console.log(">Creando areas...");
            const areasIniciales = [
                { nombre: 'Ventas' },
                { nombre: 'Calidad' },
                { nombre: 'Produccion'},
              ];
              await AREA.bulkCreate(areasIniciales);        
              console.log("Areas creadas");
        }
    } catch (e) {
        console.log("Hubo un error al crear las areas",e);
    }

}

