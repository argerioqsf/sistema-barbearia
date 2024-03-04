import React from "react";
import { Avatar } from "..";
import { twMerge } from "tailwind-merge";
import { Button, Form, InputForm } from "@/components/atoms";
import { SectionTemplateForm } from "@/types/general";
import { useHandlerForm } from "@/hooks/use-hanlder-form";

type SearchProps = {
  handlerForm: (data: any) => void;
};

const Search = ({ handlerForm }: SearchProps) => {
  const { register, handleSubmit } = useHandlerForm([
    {
      id: 1,
      title: "Search",
      boxs: [
        {
          id: 1,
          fields: [
            {
              id: "search",
              label: "Search",
              required: true,
              type: "text",
            },
          ],
        },
      ],
    },
  ]);
  return (
    <Form
      onSubmit={handleSubmit(handlerForm)}
      className="w-[90vw] md:w-full flex flex-col md:flex-row justify-start items-center gap-4 md:gap-2"
    >
      <div className="w-[90vw] md:w-96 flex flex-row justify-start items-center">
        <InputForm
          propsInput={{ ...register("search") }}
          type="text"
          className={twMerge(
            "block w-full rounded-full border-2 border-primary-100 h-10"
          )}
          placeholder="Search..."
        />
      </div>
      <Button
        type="submit"
        className="bg-primary-100 rounded-full p-0 w-[90vw] md:w-fit flex justify-center items-center"
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
