import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import Link from "@/components/atoms/Link";
import Text from "@/components/atoms/Text";
import TitleForm from "@/components/atoms/TitleForm";
import FormFieldCheckBox from "@/components/molecules/FormFieldCheckBox";
import FormFieldText from "@/components/molecules/FormFieldText";
import { usePathTranslations } from "@/hooks/use-path-translations";
import React from "react";

const FormLogin: React.FC = () => {
  const { at, or } = usePathTranslations("");
  return (
    <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
      <TitleForm title="SIM" />
      <Form action="#">
        <FormFieldText label={at('email')} type="text" id="email" />

        <FormFieldText label={at('password')} type="password" id="password" />

        <div className="flex items-center justify-between">
          <FormFieldCheckBox label={at("remember_me")} id="remember_me" />
          <Link
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline"
          >
            {or('form_login.forgot_password')}
          </Link>
        </div>

        <Button type="submit">{at("login")}</Button>

        <Text>
          Não possui conta?
          <Link
            href="#"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-2"
          >
            Cadastrar
          </Link>
        </Text>
      </Form>
    </div>
  );
};

export default FormLogin;
