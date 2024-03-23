import { z } from "zod";

export const formSchemaRegisterCourse = z.object({
  name: z.string().min(4, "O nome precisa ter 4 ou mais caracteres"),
  active: z.string().min(1, "É obrigatório informar o status do curso"),
});
