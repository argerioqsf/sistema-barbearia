import { z } from "zod";

export const formSchemaRegisterCourse = z.object({
  name: z.string().min(1),
  active: z.string().min(1),
});
