import React from "react";
import { Avatar } from "..";
import { twMerge } from "tailwind-merge";
import { Button, Form, InputForm } from "@/components/atoms";
import { UseFormRegisterReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Searchs } from "@/types/general";
import { serialize } from "v8";

type SearchProps = {
  searchs: Searchs;
  handlerForm: () => void;
};

const Search = ({ searchs, handlerForm }: SearchProps) => {
  return (
    <Form
      onSubmit={handlerForm}
      className="w-full flex flex-col md:flex-row justify-start items-center gap-4 md:gap-2"
    >
      {searchs.map((search) => (
        <div
          key={search.id}
          className="w-[90vw] sm:w-[80vw] md:w-96 flex flex-row justify-start items-center"
        >
          <InputForm
            propsInput={search.propsInput}
            type="text"
            className={twMerge(
              "block w-full rounded-full border-2 border-primary-100 h-10"
            )}
            placeholder={search.placeholder}
          />
        </div>
      ))}
      <Button
        type="submit"
        className="bg-primary-100 rounded-full p-0 w-[90vw] sm:w-[80vw] md:w-fit flex justify-center items-center "
      >
        <Avatar
          classIcon="bg-primary-100 border-transparent size-[40px]"
          size={40}
          colorIcon="white"
          icon={"Search"}
        />
      </Button>
    </Form>
  );
};

export default Search;
