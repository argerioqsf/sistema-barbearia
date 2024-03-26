"use server";

import { formSchemaSignin } from "@/components/template/SingIn/schema";
import {
  setRolesInCookieServer,
  setTokenInCookieServer,
  setUserInCookieServer,
} from "@/utils/cookieServer";

export async function loginUser(prevState: any, formData: FormData) {
  const validatedFields = formSchemaSignin.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
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
