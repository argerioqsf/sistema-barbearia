import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type FormProps = {
  children: ReactNode;
  className?: string;
  onSubmit?: () => void;
  action?: (prevState: any) => void;
  method?: string;
};

const Form = ({
  children,
  className,
  action,
  onSubmit = () => {},
  method,
}: FormProps) => {
  return (
    <form
      method={method}
      onSubmit={onSubmit}
      className={twMerge(className)}
      action={action}
    >
      {children}
    </form>
  );
};

export default Form;
