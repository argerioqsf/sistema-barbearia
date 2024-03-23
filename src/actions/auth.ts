"use server";

import { formSchemaSignin } from "@/components/template/SingIn/schema";
import { cookies } from "next/headers";
import urls from "@/constants/urls.json";

export async function loginUser(prevState: any, formData: FormData) {
  const validatedFields = formSchemaSignin.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (validatedFields.success) {
    try {
      const response = await fetch(`${urls.url_api}/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        return {
          errors: { request: [JSON.parse(errorMessage).message] },
        };
      }
      let resp = await response.json();
      cookies().set("token_SIM", resp.token);
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
