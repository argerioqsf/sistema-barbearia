import { z } from "zod";

export const formSchemaEditProfile = z.object({
  name: z.string().min(1, "O nome precisa ter 4 ou mais caracteres"),
  phone: z.string().min(1, "O campo whatsapp é obrigatório"),
  cpf: z.string().min(1, "O campo documento é obrigatório"),
  pix: z.string().min(1, "O campo chave pix é obrigatório"),
  email: z.string().min(2, "O campo email é obrigatório"),
  city: z.string().min(1, "O campo cidade é obrigatório"),
  active: z.string().min(1, "O campo status é obrigatório"),
});
