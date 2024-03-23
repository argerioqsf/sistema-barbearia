"use server";

import { formSchemaRegisterCourse } from "@/components/template/RegisterCourses/schema";
import { cookies } from "next/headers";
import urls from "@/constants/urls.json";

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
      const response = await fetch(`${urls.url_api}/create/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_SIM?.value}`,
        },
        body: JSON.stringify({
          name: formData.get("name"),
          active: formData.get("active") == "1" ? true : false,
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
        register_success: true,
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
