"use client";

import { Form, Text } from "@/components/atoms";
import Button from "@/components/atoms/Button";
// import Form from "@/components/atoms/Form";
import LinkDefault from "@/components/atoms/LinkDefault";
import FormFieldCheckBox from "@/components/molecules/FormFieldCheckBox";
import FormFieldText from "@/components/molecules/FormFieldText";
import { formSchemaSignin } from "@/components/template/SingIn/schema";
import { useHandlerRouter } from "@/hooks/use-handler-router";
import { usePathTranslations } from "@/hooks/use-path-translations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormLoginProps = {
  action: (prevState: any, formData: FormData) => Promise<any>;
};

type LoginSchemaType = z.infer<typeof formSchemaSignin>;

const FormLogin = ({ action }: FormLoginProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(formSchemaSignin),
  });
  const { at, sc } = usePathTranslations("");
  const { pushRouter } = useHandlerRouter();

  const initialState = {
    errors: null,
    ok: false,
  };

  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state.ok) {
      pushRouter("dashboard/home");
    }
  }, [pushRouter, state.ok]);

  return (
    <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
      <Form action={formAction}>
        <FormFieldText
          classInput={`bg-transparent py-3 pl-6 text-white ${
            errors.email && "ring-red-500 focus:ring-red-500"
          }`}
          placeholder={at("email")}
          type="text"
          props={{ ...register("email") }}
          label="Email"
          error={state?.errors?.email && state?.errors?.email[0]}
        />

        <FormFieldText
          classInput={`bg-transparent py-3 pl-6 text-white ${
            errors.password && "ring-red-500 focus:ring-red-500"
          }`}
          placeholder={at("password")}
          type="text"
          props={{ ...register("password") }}
          label="Senha"
          error={state?.errors?.password && state?.errors?.password[0]}
        />

        <div className="flex items-center py-4 justify-between">
          {/* <FormFieldCheckBox
            className="text-white"
            label={at("remember_me")}
            id="remember_me"
          /> */}
          <LinkDefault
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline text-white"
          >
            {sc("form_login.forgot_password")}
          </LinkDefault>
        </div>

        {state?.errors?.request && (
          <Text
            title={state?.errors?.request[0]}
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis pb-4"
          >
            {state?.errors?.request[0]}
          </Text>
        )}

        <Button
          className="w-full bg-secondary-100 text-primary-100 py-3 font-bold"
          type="submit"
        >
          {at("login")}
        </Button>
      </Form>
    </div>
  );
};

export default FormLogin;
