import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import LinkDefault from "@/components/atoms/LinkDefault";
import FormFieldCheckBox from "@/components/molecules/FormFieldCheckBox";
import FormFieldText from "@/components/molecules/FormFieldText";
import { usePathTranslations } from "@/hooks/use-path-translations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldErrors, UseFormRegister, useForm } from "react-hook-form";
import { z } from "zod";

type FormLoginProps = {
  onSubmit: (() => void) | undefined;
  errors: FieldErrors<any>;
  register: UseFormRegister<any>;
};

const FormLogin = ({ onSubmit, errors, register }: FormLoginProps) => {
  const { at, sc } = usePathTranslations("");

  return (
    <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
      <Form onSubmit={onSubmit} action="#">
        <FormFieldText
          classInput={`bg-transparent py-3 pl-6 text-white ${
            errors.email && "ring-red-500 focus:ring-red-500"
          }`}
          bgColor="red-300"
          placeholder={at("email")}
          type="text"
          propsInput={{ ...register("email") }}
          label="Email"
          error={errors.email?.message}
        />

        <FormFieldText
          classInput={`bg-transparent py-3 pl-6 text-white ${
            errors.password && "ring-red-500 focus:ring-red-500"
          }`}
          bgColor="red-300"
          placeholder={at("password")}
          type="text"
          propsInput={{ ...register("password") }}
          label="Senha"
          error={errors.email?.message}
        />

        <div className="flex items-center py-4 justify-between">
          <FormFieldCheckBox
            className="text-white"
            label={at("remember_me")}
            id="remember_me"
          />
          <LinkDefault
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline text-white"
          >
            {sc("form_login.forgot_password")}
          </LinkDefault>
        </div>

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
