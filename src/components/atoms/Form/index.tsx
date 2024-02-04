import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type FormProps = {
  children: ReactNode;
  className?: string;
  action?: string;
};

const Form = ({ children, className, action = "#" }: FormProps) => {
  return (
    <form
      className={twMerge("space-y-4 md:space-y-6", className)}
      action={action}
    >
      {children}
    </form>
  );
};

export default Form;
