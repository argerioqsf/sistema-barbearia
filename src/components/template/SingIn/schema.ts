import { z } from "zod";

export const formSchemaSignin = z.object({
  email: z.string().min(1),
  password: z.string().min(6),
});
