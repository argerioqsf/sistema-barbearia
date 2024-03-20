"use server";

import { formSchemaRegisterCourse } from "@/components/template/RegisterCourses/schema";
import { cookies } from "next/headers";

export async function registerCourse(prevState: any, formData: FormData) {
  const validatedFields = formSchemaRegisterCourse.safeParse({
    name: formData.get("name"),
    active: formData.get("active"),
  });

  if (validatedFields.success) {
    try {
      const token_SIM = cookies().get("token_SIM");
      if (!token_SIM?.value) {
        return {
          errors: { request: ["Erro de credenciais"] },
        };
      }
      const response = await fetch("http://localhost:3333/create/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_SIM?.value}`,
        },
        body: JSON.stringify({
          name: formData.get("name"),
          active: !formData.get("active"),
        }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        return {
          errors: { request: [JSON.parse(errorMessage).message] },
        };
      }
      return {
        errors: {},
        ok: true,
      };
    } catch (error) {
      return {
        errors: { request: ["Failed to Login"] },
      };
    }
  } else if (validatedFields.error) {
    return {
      errors: { ...validatedFields.error.flatten().fieldErrors },
    };
  }
}
