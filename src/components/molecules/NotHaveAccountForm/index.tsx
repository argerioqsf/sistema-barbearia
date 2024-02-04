import Link from "@/components/atoms/Link";
import Text from "@/components/atoms/Text";
import React from "react";
import { twMerge } from "tailwind-merge";

type NotHaveAccountFormProps = {
  className?: string;
};

const NotHaveAccountForm = ({ className }: NotHaveAccountFormProps) => {
  return (
    <div className={twMerge("", className)}>
      <Text>
        Não possui conta?
        <Link
          href="#"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-2"
        >
          Cadastrar
        </Link>
      </Text>
    </div>
  );
};

export default NotHaveAccountForm;
