import InputForm from "@/components/atoms/InputForm";
import LabelForm from "@/components/atoms/LabelForm";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type FormFieldTextProps = {
  label?: string;
  type: string;
  id: string;
  placeholder?: string;
  classInput?: string;
  bgColor?: string;
};

const FormFieldText = ({
  label,
  id,
  placeholder,
  classInput,
  type,
}: FormFieldTextProps) => {
  return (
    <div>
      {label && <LabelForm label={label} />}
      <div className="mt-2">
        <InputForm
          type={type}
          id={id}
          placeholder={placeholder}
          className={twMerge(
            "rounded-md border-0",
            "ring-gray-300 placeholder:text-gray-400 text-gray-900 focus:ring-secondary-100",
            "py-1.5 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6",
            classInput
          )}
        />
      </div>
    </div>
  );
};

export default FormFieldText;
