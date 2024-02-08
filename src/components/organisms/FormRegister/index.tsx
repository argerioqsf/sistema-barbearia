"use client";

import { Button, Form, Text } from "@/components/atoms";
import Box from "@/components/atoms/Box";
import { FormFieldText } from "@/components/molecules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormRegisterProps = {
  title: string;
};

const UserSchema = z.object({
  name: z.string(),
  last_name: z.string(),
});

const FormRegister = ({ title }: FormRegisterProps) => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(UserSchema),
  });
  const router = useRouter();
  function handlerRegister(data: any) {
    console.log(data);
  }
  return (
    <div className="w-full">
      <Form className="mb-8">
        <div className="w-[90vw] lg:w-[95vw] flex flex-row justify-between items-center">
          <Text className="uppercase font-bold text-2xl lg:text-4xl text-black whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </Text>
          <Button
            onClick={handlerRegister}
            className="rounded-xl h-10 flex justify-center items-center px-2 sm:px-5 md:px-10 bg-secondary-50 text-white"
            type="submit"
          >
            Cadastrar
          </Button>
        </div>
        <div className="w-[90vw] lg:w-[95vw] flex flex-col gap-4 bg-gray-200 p-6 rounded-xl mt-8">
          <Box className="grid-cols-2">
            <FormFieldText
              classInput="bg-gray-300"
              type="text"
              label="Nome"
              id="name"
            />
            <FormFieldText
              classInput="bg-gray-300"
              type="text"
              label="Sobrenome"
              id="last_name"
            />
          </Box>
          <Box>
            <FormFieldText
              classInput="bg-gray-300"
              type="file"
              label="Foto: (600 x 600)"
              id="image"
            />
          </Box>
          <Box className="grid-cols-2">
            <FormFieldText
              classInput="bg-gray-300"
              type="text"
              label="Whatsapp"
              id="whatsapp"
            />
            <FormFieldText
              classInput="bg-gray-300"
              type="text"
              label="Documento"
              id="documento"
            />
          </Box>
          <Box className="grid-cols-2">
            <FormFieldText
              classInput="bg-gray-300"
              type="text"
              label="Nascimento"
              id="datebirth"
            />
            <FormFieldText
              classInput="bg-gray-300"
              type="text"
              label="Genero"
              id="genero"
            />
          </Box>
          <Box className="grid-cols-2">
            <FormFieldText
              classInput="bg-gray-300"
              type="text"
              label="E-mail"
              id="email"
            />
            <FormFieldText
              classInput="bg-gray-300"
              type="password"
              label="Senha"
              id="password"
            />
          </Box>
          <Box className="grid-cols-3">
            <FormFieldText
              classInput="bg-gray-300"
              type="text"
              label="Nivel"
              id="nivel"
            />
            <FormFieldText
              classInput="bg-gray-300"
              type="password"
              label="Status"
              id="status"
            />
            <FormFieldText
              classInput="bg-gray-300"
              type="password"
              label="Data"
              id="data"
            />
          </Box>
        </div>
        <div className="w-[90vw] lg:w-[95vw] flex flex-col gap-4 bg-gray-200 p-6 rounded-xl mt-8">
          <Box>
            <FormFieldText
              classInput="bg-gray-300"
              type="text"
              label="Permição"
              id="permicao"
            />
          </Box>
        </div>
      </Form>
    </div>
  );
};

export default FormRegister;
