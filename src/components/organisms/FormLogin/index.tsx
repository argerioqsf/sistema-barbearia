import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import LinkDefault from "@/components/atoms/LinkDefault";
import FormFieldCheckBox from "@/components/molecules/FormFieldCheckBox";
import FormFieldText from "@/components/molecules/FormFieldText";
import { usePathTranslations } from "@/hooks/use-path-translations";
import { useRouter } from "next/navigation";
import React from "react";

const FormLogin: React.FC = () => {
  const { at, sc } = usePathTranslations("");
  // const router = useRouter();
  function login() {
    // router.push("/dashboard/home");
  }

  return (
    <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
      <Form action="#">
        <FormFieldText
          classInput="bg-transparent py-3 pl-6 text-white"
          bgColor="red-300"
          placeholder={at("email")}
          type="text"
          id="email"
        />

        <FormFieldText
          classInput="bg-transparent py-3 pl-6 text-white"
          placeholder={at("password")}
          type="password"
          id="password"
        />

        <div className="flex items-center justify-between">
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
