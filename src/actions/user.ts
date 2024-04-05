"use server";

import { formSchemaRegisterUserProfile } from "@/components/template/RegisterUser/schema";
import { getTokenFromCookieServer } from "@/utils/cookieServer";

export async function registerUserProfile(prevState: any, formData: FormData) {
  console.log('formData.get("active"): ', !!formData.get("active"));
  const validatedFields = formSchemaRegisterUserProfile.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    active: formData.get("active"),
    phone: formData.get("phone"),
    cpf: formData.get("cpf"),
    genre: formData.get("genre"),
    birthday: formData.get("birthday"),
    pix: formData.get("pix"),
    role: formData.get("role"),
  });

  if (validatedFields.success) {
    try {
      const token_SIM = getTokenFromCookieServer();
      if (!token_SIM) {
        return {
          errors: { request: ["Erro de credenciais"] },
        };
      }
      const response = await fetch(`${process.env.URL_API}/create/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          active: formData.get("active") === "sim" ? true : false,
          phone: formData.get("phone"),
          cpf: formData.get("cpf"),
          genre: formData.get("genre"),
          birthday: formData.get("birthday"),
          pix: formData.get("pix"),
          role: formData.get("role"),
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
