import React from "react";
import { Avatar } from "..";
import { twMerge } from "tailwind-merge";
import { Button, Form, InputForm } from "@/components/atoms";
import { UseFormRegister, UseFormRegisterReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Searchs } from "@/types/general";
import { serialize } from "v8";

type SearchProps = {
  handlerForm: () => any;
  register: UseFormRegister<any>
};

const Search = ({ handlerForm, register }: SearchProps) => {
  return (
    <Form
      onSubmit={handlerForm}
      className="w-[90vw] md:w-full flex flex-col md:flex-row justify-start items-center gap-4 md:gap-2"
    >
        <div
          className="w-[90vw] md:w-96 flex flex-row justify-start items-center"
        >
          <InputForm
            propsInput={{...register('search')}}
            type="text"
            className={twMerge(
              "block w-full rounded-full border-2 border-primary-100 h-10"
            )}
            placeholder='Search...'
          />
        </div>
      <Button
        type="submit"
        className="bg-primary-100 rounded-full p-0 w-[90vw] md:w-fit flex justify-center items-center "
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
