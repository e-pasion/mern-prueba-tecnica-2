import axios from "./axios";


export const getEmpleadosRequest= () => axios.get(`/empleado`)
export const getEmpleadoRequest=id => axios.get(`/empleado/${id}`)
export const createEmpleadoRequest=empleado => axios.post(`/empleado`,empleado)
export const updateEmpleadoRequest=(empleado) => axios.put(`/empleado/${empleado.id}`,empleado)
export const deleteEmpleadoRequest=id => axios.delete(`/empleado/${id}`)