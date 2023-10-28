import { useEffect, useState } from "react";
import { getAreasRequest } from "../api/area";
import { getRolesRequest } from "../api/rol";
import { createEmpleadoRequest, getEmpleadoRequest, updateEmpleadoRequest } from "../api/empleado";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { errorNotification, successNotification } from "../utils/notification";
import { Link, useNavigate, useParams } from "react-router-dom";

function EmpleadoForm() {
  const { register, handleSubmit,reset } = useForm();
  const [areas, setAreas] = useState([]);
  const [roles, setRoles] = useState([]);
  const { id } = useParams();
  const [editRoles,setEditRoles] = useState([]);
    const navigate= useNavigate();

  const getData = async () => {
    setAreas((await getAreasRequest()).data);
    setRoles((await getRolesRequest()).data);
  };

  const createEmpleado = async (data) => {
    try {
        await createEmpleadoRequest(data);
        successNotification("Empleado creado correctamente")
    } catch (error) {
        console.log(error.response.data);
        errorNotification(error.response.data.toString())
        
    }
    console.log(data);
  };

  const editEmpleado=async(data) =>{
    try {
        data.id=id;
        await updateEmpleadoRequest(data);
        successNotification("Empleado editado correctamente")
    } catch (error) {
        console.log(error.response.data);
        errorNotification(error.response.data.toString())
        
    }
    console.log(data);
  }

  const getEmpleado= async(id)=>{
    const data=await getEmpleadoRequest(id);
    console.log(data.data);
    setEditRoles(data.data.roles.map((rol)=>rol.id));
        reset({
            'nombre':data.data.nombre,
            'email':data.data.email,
            'sexo':data.data.sexo,
            'areaId':data.data.area.id,
            'descripcion':data.data.descripcion,
            'boletin':data.data.boletin
        })
  }

  useEffect(() => {
    getData();
    if(id){
        console.log("editado--") 
        getEmpleado(id);}
  }, []);

  const onSubmit = handleSubmit((data) => {



    const selectedRoles = Object.keys(data.rolesId).filter(
      (key) => data.rolesId[key]
    );
    if (selectedRoles.length < 1){
        errorNotification("Selecciona como minimo un rol")
    }
    else{
        data.rolesId = selectedRoles;
        if(id) editEmpleado(data);
        else createEmpleado(data);
    }
  });

  return (
    <div className="bg-white text-sm space-y-3 p-5">
      <h1 className="text-3xl font-semibold">{ id?'Editar empleado': 'Crear empleado'}</h1>
      <div className="bg-sky-100 py-3 px-3 text-sky-700 text-sm font-medium border rounded-lg m-1">
        <p>Los campos con asteriscos (*) son obligatorios</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 font-normal" noValidate>
        <div className="flex items-center">
          <div className="w-40 ml-4 mr-8 flex justify-end">
            <p className="font-semibold whitespace-nowrap">Nombre completo *</p>
          </div>
          <div className="w-full">
            <input
              className="w-[calc(100%-10px)] border p-1 rounded-md"
              type="text"
              placeholder="Nombre completo del empleado"
              {...register("nombre", { required: 'El Nombre es obligatorio' })}
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-40 ml-4 mr-8 flex justify-end">
            <p className="font-semibold whitespace-nowrap">
              Correo electronico *
            </p>
          </div>
          <div className="w-full">
            <input
              className="w-[calc(100%-10px)] border p-1 rounded-md"
              type="text"
              placeholder="Correo electronico"
              {...register("email", { required: 'El email es obligatorio' })}
            />
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-40 ml-4 mr-8 flex justify-end">
            <p className="font-semibold whitespace-nowrap">Sexo *</p>
          </div>
          <div className="w-full">
            <div className="flex items-center mb-4">
              <input
                type="radio"
                value="M"
                name="default-radio"
                className="w-4 h-4 "
                {...register("sexo", { required: 'El sexo es obligatorio' })}
              />
              <label className="ml-2 text-sm ">Masculino</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="F"
                name="default-radio"
                className="w-4 h-4 accent-pink-600 "
                {...register("sexo", { required: 'El sexo es obligatorio' })}
              />
              <label className="ml-2 text-sm">Femenino</label>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-40 ml-4 mr-8 flex justify-end">
            <p className="font-semibold whitespace-nowrap">Area *</p>
          </div>
          <div className="w-full">
            <select
              className="w-[calc(100%-10px)] border p-1 rounded-md"
              {...register("areaId", { required: 'Debes seleccionar un area' })}
            >
              {areas.map((area) => {
                return (
                  <option key={area.id} value={area.id}>
                    {area.nombre}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-40 ml-4 mr-8 flex justify-end">
            <p className="font-semibold whitespace-nowrap mt-4">
              Descripción *
            </p>
          </div>
          <div className="w-full">
            <textarea
              rows={4}
              className="w-[calc(100%-10px)] border p-1 rounded-md"
              placeholder="Descripcion de la experiencia del usuario"
              {...register("descripcion", { required: 'La descripcion es obligatoria' })}
            />
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-40 ml-4 mr-8 flex justify-end"></div>
          <div className="w-full">
            <div className="flex items-center">
              <input
                type="checkbox"
                value=""
                className="w-4 h-4"
                {...register("boletin")}
              />
              <label className="ml-2 text-sm ">
                Deseo recibir boletin informativo
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-40 ml-4 mr-8 flex justify-end">
            <p className="font-semibold whitespace-nowrap">Roles *</p>
          </div>
          <div className="w-full space-y-3">
            {roles.map((rol) => (
              <div key={rol.id} className="flex items-center">
                <input
                defaultChecked={id&&editRoles.includes(rol.id)}
                  type="checkbox"
                  name={`rolesId[${rol.id}]`}
                  value={rol.id}
                  {...register(`rolesId[${rol.id}]`)}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm">{rol.nombre}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-40 ml-4 mr-8 flex justify-end"></div>
          <div className="w-full">
            <button
              type="submit"
              className="text-white bg-cyan-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-3 py-1 mr-2 mb-2 focus:outline-none"
            >
              {id?'Editar':'Guardar'}
            </button>

            <Link
            to={'/'}
              type="submit"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-sm text-sm px-3 py-1 mr-2 mb-2 focus:outline-none"
            >
              Volver
            </Link>
          </div>
        </div>
      </form>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
export default EmpleadoForm;
