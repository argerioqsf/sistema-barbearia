"use server";

import { formSchemaRegisterCourse } from "@/components/template/RegisterCourses/schema";
import { getTokenFromCookieServer } from "@/utils/cookieServer";

export async function registerCourse(prevState: any, formData: FormData) {
  const validatedFields = formSchemaRegisterCourse.safeParse({
    name: formData.get("name"),
    active: formData.get("active"),
  });

  if (validatedFields.success) {
    try {
      const token_SIM = getTokenFromCookieServer();
      if (!token_SIM) {
        return {
          errors: { request: ["Erro de credenciais"] },
        };
      }
      const response = await fetch(`${process.env.URL_API}/create/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_SIM}`,
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
