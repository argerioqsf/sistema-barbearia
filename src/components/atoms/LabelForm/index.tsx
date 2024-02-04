import React from "react";
import { twMerge } from "tailwind-merge";

type LabelFormProps = {
  label: string;
  htmlFor?: string;
  color?: string;
  className?: string;
};

const LabelForm = ({ label, htmlFor, className }: LabelFormProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        "block text-sm font-medium leading-6 text-gray-900",
        className
      )}
    >
      {label}
    </label>
  );
};

export default LabelForm;
