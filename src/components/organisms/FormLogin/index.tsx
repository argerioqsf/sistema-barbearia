import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import Link from "@/components/atoms/Link";
import TitleForm from "@/components/atoms/TitleForm";
import FormFieldCheckBox from "@/components/molecules/FormFieldCheckBox";
import FormFieldText from "@/components/molecules/FormFieldText";
import NotHaveAccountForm from "@/components/molecules/NotHaveAccountForm";
import React from "react";

const FormLogin: React.FC = () => {
  return (
    <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
      <TitleForm title="SIM" />
      <Form action="#">
        <FormFieldText label="Email" type="text" id="email" />

        <FormFieldText label="Senha" type="password" id="password" />

        <div className="flex items-center justify-between">
          <FormFieldCheckBox label="Remember me" id="remember_me" />
          <Link
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>

        <Button type="submit">Sign in</Button>
        <NotHaveAccountForm />
      </Form>
    </div>
  );
};

export default FormLogin;
