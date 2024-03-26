"use server";

import { formSchemaRegisterSegment } from "@/components/template/RegisterSegments/schema";
import { getTokenFromCookieServer } from "@/utils/cookieServer";

export async function registerSegment(prevState: any, formData: FormData) {
  const validatedFields = formSchemaRegisterSegment.safeParse({
    name: formData.get("name"),
  });

  if (validatedFields.success) {
    try {
      const token_SIM = getTokenFromCookieServer();
      if (!token_SIM) {
        return {
          errors: { request: ["Erro de credenciais"] },
        };
      }
      const response = await fetch(`${process.env.URL_API}/create/segments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token_SIM}`,
        },
        body: JSON.stringify({
          name: formData.get("name"),
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
        errors: { request: ["Falha ao criar Segmento"] },
      };
    }
  } else if (validatedFields.error) {
    return {
      errors: { ...validatedFields.error.flatten().fieldErrors },
    };
  }
}
