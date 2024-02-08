import React from "react";
import { Avatar } from "..";
import { twMerge } from "tailwind-merge";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { InputForm } from "@/components/atoms";
import { UseFormRegisterReturn } from "react-hook-form";

type SearchProps = {
  propsInput: UseFormRegisterReturn<string>;
};

const Search = ({ propsInput }: SearchProps) => {
  return (
    <div className="w-[90vw] sm:w-[80vw] md:w-96 flex flex-row justify-start items-center">
      <InputForm
        propsInput={propsInput}
        type="text"
        className={twMerge(
          "block w-full rounded-full border-2 border-primary-100 mr-4 h-10"
        )}
        placeholder={"Search..."}
      />
      <Avatar
        classIcon="bg-primary-100 border-transparent size-[40px]"
        size={40}
        colorIcon="white"
        icon={SearchIcon}
      />
    </div>
  );
};

export default Search;
