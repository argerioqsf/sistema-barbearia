import InputForm from "@/components/atoms/InputForm";
import LabelForm from "@/components/atoms/LabelForm";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

type FormFieldTextProps = {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  className?: string;
};

const FormFieldText = ({
  label,
  id,
  placeholder,
  className,
}: FormFieldTextProps) => {
  return (
    <div className={className}>
      <LabelForm label={label} />
      <div className="mt-2">
        <InputForm
          type="text"
          id={id}
          placeholder={placeholder}
          className="rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-gray-900"
        />
      </div>
    </div>
  );
};

export default FormFieldText;
