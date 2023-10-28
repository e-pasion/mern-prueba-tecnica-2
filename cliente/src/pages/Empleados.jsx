import { useEffect, useState } from "react"
import { deleteEmpleadoRequest, getEmpleadoRequest, getEmpleadosRequest } from "../api/empleado";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Empleados() {
    const [empleados,setEmpleados] = useState([]);

    const getEmpleados=async()=>{
        setEmpleados(((await getEmpleadosRequest()).data));
    }

    const deleteEmpleado=async(id)=>{
        await deleteEmpleadoRequest(id);
        getEmpleados();
    }

    useEffect(()=>{
        getEmpleados();
    },[])




  return (
    <div className="bg-white text-sm space-y-3 p-5">
        <h1 className="text-3xl font-semibold">Listar empleado</h1>
        <div className="w-full flex justify-end">
        <Link
            to={'/form'}
              type="submit"
              className="text-white bg-cyan-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-sm text-sm px-3 py-1 mr-2 mb-2 focus:outline-none"
            >
              Crear
            </Link>
        </div>


        <div className="flex flex-col">
  <div className="overflow-x-auto ">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="w-full text-left text-sm font-light">
          <thead
            className="border-b bg-white font-medium">
            <tr>
              <th scope="col" className="px-6 py-4"><i className="fa-solid fa-user"></i>Nombre</th>
              <th scope="col" className="px-6 py-4"><i className="fa-solid fa-at"></i>Email</th>
              <th scope="col" className="px-6 py-4"><i className="fa-solid fa-venus-mars"></i>Sexo</th>
              <th scope="col" className="px-6 py-4"><i className="fa-solid fa-briefcase"></i>Area</th>
              <th scope="col" className="px-6 py-4"><i className="fa-solid fa-envelope"></i>Boletin</th>
              <th scope="col" className="px-6 py-4">Modificar</th>
              <th scope="col" className="px-6 py-4">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            
            {
                empleados.map((empleado,index)=>{
                    return(
                        <tr key={empleado.id} className={`border-b ${index%2==0?"bg-neutral-100":"bg-white"} `}>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{empleado.nombre}</td>
                            <td className="whitespace-nowrap px-6 py-4">{empleado.email}</td>
                            <td className="whitespace-nowrap px-6 py-4">{empleado.sexo==="F"?"Femenino":"Masculino"}</td>
                            <td className="whitespace-nowrap px-6 py-4">{empleado.area.nombre}</td>
                            <td className="whitespace-nowrap px-6 py-4">{empleado.boletin?"Si":"No"}</td>
                            <td className="whitespace-nowrap px-6 py-4"><Link to={`/form/${empleado.id}`}><i className="fa-solid fa-pen-to-square text-xl cursor-pointer"></i></Link></td>
                            <td className="whitespace-nowrap px-6 py-4"><i className="fa-solid fa-trash-can text-xl cursor-pointer" onClick={()=>deleteEmpleado(empleado.id)}></i></td>
                    </tr>
                    )
                })
            }
           

          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
export default Empleados