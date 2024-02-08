"use client";

import { Text } from "@/components/atoms";
import InputForm from "@/components/atoms/InputForm";
import LabelForm from "@/components/atoms/LabelForm";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

type FormFieldTextProps = {
  label: string;
  type: string;
  placeholder?: string;
  classInput?: string;
  bgColor?: string;
  propsInput: UseFormRegisterReturn<string>;
  error: any;
};

const FormFieldText = ({
  label,
  placeholder,
  classInput,
  type,
  propsInput,
  error,
}: FormFieldTextProps) => {
  console.log(error);
  return (
    <div>
      {label && <LabelForm label={label} />}
      <div className="mt-2">
        <InputForm
          propsInput={{ ...propsInput }}
          type={type}
          placeholder={placeholder}
          className={twMerge(
            "rounded-md border-0",
            "ring-gray-300 placeholder:text-gray-400 text-gray-900 focus:ring-secondary-100",
            "py-1.5 shadow-sm ring-1 ring-inset  focus:ring-inset focus:ring-2 sm:text-sm sm:leading-6",
            classInput
          )}
        />
      </div>

      {error && (
        <Text role="alert" className="text-red-400 font-semibold">
          {error}
        </Text>
      )}
    </div>
  );
};

export default FormFieldText;
