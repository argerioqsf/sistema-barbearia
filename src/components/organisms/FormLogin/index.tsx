import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import LinkDefault from "@/components/atoms/LinkDefault";
import Text from "@/components/atoms/Text";
import TitleForm from "@/components/atoms/TitleForm";
import FormFieldCheckBox from "@/components/molecules/FormFieldCheckBox";
import FormFieldText from "@/components/molecules/FormFieldText";
import { usePathTranslations } from "@/hooks/use-path-translations";
import React from "react";

const FormLogin: React.FC = () => {
  const { at, sc } = usePathTranslations("");
  return (
    <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
      <TitleForm title="SIM" />
      <Form action="#">
        <FormFieldText label={at("email")} type="text" id="email" />

        <FormFieldText label={at("password")} type="password" id="password" />

        <div className="flex items-center justify-between">
          <FormFieldCheckBox label={at("remember_me")} id="remember_me" />
          <LinkDefault
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline"
          >
            {sc("form_login.forgot_password")}
          </LinkDefault>
        </div>

        <Button className="w-full border" type="submit">
          {at("login")}
        </Button>

        <Text>
          {at("register")}
          <LinkDefault
            href="#"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-2"
          >
            {sc("form_login.not_have_account")}
          </LinkDefault>
        </Text>
      </Form>
    </div>
  );
};

export default FormLogin;
