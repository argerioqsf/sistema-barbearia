"use server";

import { formSchemaEditProfile } from "@/components/template/Profile/schema";
import {
  setRolesInCookieServer,
  setTokenInCookieServer,
  setUserInCookieServer,
} from "@/utils/cookieServer";

export async function editProfile(prevState: any, formData: FormData) {
  const validatedFields = formSchemaEditProfile.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    cpf: formData.get("cpf"),
    pix: formData.get("pix"),
    email: formData.get("email"),
    city: formData.get("city"),
    status: formData.get("status"),
  });

  if (validatedFields.success) {
    try {
      const response = await fetch(`${process.env.URL_API}/sessions`, {
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
      let token = resp?.token;
      let user = resp?.user;
      let roles = resp?.roles;
      setTokenInCookieServer(token);
      setUserInCookieServer(user);
      setRolesInCookieServer(roles);
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
