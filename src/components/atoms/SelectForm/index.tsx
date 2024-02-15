import { OptionsTemplateForm } from "@/types/general";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type SelectFormPros = {
  type?: string;
  placeholder?: string;
  className?: string;
  propsSelect?: UseFormRegisterReturn<string>;
  options: Array<OptionsTemplateForm> | undefined;
};

const SelectForm = ({
  type,
  placeholder,
  className,
  propsSelect,
  options,
}: SelectFormPros) => {
  return (
    <>
      <select
        className={twMerge(
          "appearance-none border-0 outline-0 w-full",
          className
        )}
        {...propsSelect}
      >
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </>
  );
};

export default SelectForm;
