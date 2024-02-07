import React from "react";
import { Avatar } from "..";
import { twMerge } from "tailwind-merge";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { InputForm } from "@/components/atoms";

const Search: React.FC = () => {
  return (
    <div className="w-[90vw] sm:w-[80vw] md:w-96 flex flex-row justify-start items-center">
      <InputForm
        type="text"
        id="search"
        className={twMerge(
          "block w-full rounded-full border-2 border-primary-100 mr-4 h-10"
        )}
        placeholder={"Search..."}
      />
      <Avatar
        size={20}
        bgColorIcon="primary-100"
        colorIcon="white"
        icon={SearchIcon}
      />
    </div>
  );
};

export default Search;
