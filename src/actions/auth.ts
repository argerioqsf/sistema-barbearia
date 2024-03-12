"use server";

import { formSchemaSignin } from "@/components/template/SingIn/schema";

export async function loginUser(prevState: any, formData: FormData) {
  const validatedFields = formSchemaSignin.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.log("data SingInSection: ", formData.get("email"));
  if (validatedFields.success) {
    try {
      const response = await fetch("http://localhost:3333/sessions", {
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
