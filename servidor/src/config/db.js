import { Sequelize } from "sequelize";

export const sequelize= new Sequelize("employee_mmer","root","",{
    host:'localhost',
    dialect:'mysql',
    define: {
        timestamps: false, // Deshabilita la creación de createdAt y updatedAt en todos los modelos
      },
})

export const dbConnect=async()=>{
    try {
        await sequelize.sync();
        console.log(">Db conectada");
    } catch (e) {
        console.error("Error al conectar base de datos",e.message)
        
    }

}
