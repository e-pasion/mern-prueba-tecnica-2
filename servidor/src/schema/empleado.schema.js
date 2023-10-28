import { string, z } from 'zod'

export const empleadoSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  email: z.string({
    message:"El correo electrónico es obligatorio"
  }).email({
    message:"El correo electrónico debe ser una dirección de correo válida"
  }),
  sexo: z.string().length(1, { message: "El sexo es obligatorio" }),
  boletin: z.boolean().or(z.literal(false), { message: "Boletín debe ser obligatorio" }),
  descripcion: z.string().min(1, { message: "La descripción es obligatoria" }),
});
