"use client";

import { Text } from "@/components/atoms";
import InputForm from "@/components/atoms/InputForm";
import LabelForm from "@/components/atoms/LabelForm";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type FormFieldTextProps = {
  label: string;
  type: string;
  placeholder?: string;
  classInput?: string;
  bgColor?: string;
  props: UseFormRegisterReturn<string>;
  error: any;
};

const FormFieldText = ({
  label,
  placeholder,
  classInput,
  type,
  props,
  error,
}: FormFieldTextProps) => {
  return (
    <div>
      {label && <LabelForm htmlFor={props.name} label={label} />}
      <div className="mt-2">
        <InputForm
          propsInput={{ ...props }}
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
        <Text
          title={error}
          role="alert"
          className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {error}
        </Text>
      )}
    </div>
  );
};

export default FormFieldText;
