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

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const userSchema = z.object({
  name: z.string().min(2, { message: "Must be 2 or more characters long" }),
  last_name: z.string().min(2),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  whatsapp: z.string().min(2),
  documento: z.string().min(2),
  datebirth: z.string().min(2),
  genero: z.string().min(2),
  email: z.string().min(2),
  password: z.string().min(2),
  nivel: z.string().min(2),
  status: z.string().min(2),
  date: z.string().min(2),
  permission: z.string().min(2),
});

type UserSchemaType = z.infer<typeof userSchema>;

const FormRegister = ({ title }: FormRegisterProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
  });
  function handleRegister(data: UserSchemaType) {
    console.log("data FormRegister: ", data);
  }
  return (
    <div className="w-full">
      <Form onSubmit={handleSubmit(handleRegister)} className="mb-8">
        <div className="w-[90vw] lg:w-[95vw] flex flex-row justify-between items-center">
          <Text className="uppercase font-bold text-2xl lg:text-4xl text-black whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </Text>
          <Button
            className="rounded-xl h-10 flex justify-center items-center px-2 sm:px-5 md:px-10 bg-secondary-50 text-white"
            type="submit"
          >
            Cadastrar
          </Button>
        </div>

        <div className="w-[90vw] lg:w-[95vw] mt-10 lg:mt-8">
          <div className="p-4 pb-2 w-max bg-gray-200 rounded-xl rounded-b-none">
            DADOS PESSOAIS
          </div>
          <div className="w-[90vw lg:w-[95vw] border-2 flex flex-col gap-4 bg-gray-200 p-6 rounded-xl rounded-tl-none">
            <Box className="grid-cols- md:grid-cols-2">
              <FormFieldText
                propsInput={{ ...register("name", { required: true }) }}
                classInput={`bg-gray-300 ${
                  errors.name && "ring-red-500 focus:ring-red-500"
                }`}
                type="text"
                label="Nome"
                error={errors.name?.message}
              />
              <FormFieldText
                propsInput={{ ...register("last_name", { required: true }) }}
                classInput={`bg-gray-300 ${
                  errors.last_name && "ring-red-500 focus:ring-red-500"
                }`}
                type="text"
                label="Sobrenome"
                error={errors.name?.message}
              />
            </Box>
            <Box>
              <FormFieldText
                classInput={`bg-gray-300 pl-2 ${
                  errors.image && "ring-red-500 focus:ring-red-500"
                }`}
                type="file"
                label="Foto: (600 x 600)"
                propsInput={{ ...register("image", { required: true }) }}
                error={errors.image?.message}
              />
            </Box>
            <Box className="grid-cols-1 md:grid-cols-2">
              <FormFieldText
                classInput={`bg-gray-300 ${
                  errors.whatsapp && "ring-red-500 focus:ring-red-500"
                }`}
                type="text"
                label="Whatsapp"
                propsInput={{ ...register("whatsapp", { required: true }) }}
                error={errors.whatsapp?.message}
              />
              <FormFieldText
                classInput={`bg-gray-300 ${
                  errors.documento && "ring-red-500 focus:ring-red-500"
                }`}
                type="text"
                label="Documento"
                propsInput={{ ...register("documento", { required: true }) }}
                error={errors.documento?.message}
              />
            </Box>
            <Box className="grid-cols-1 md:grid-cols-2">
              <FormFieldText
                classInput={`bg-gray-300 ${
                  errors.datebirth && "ring-red-500 focus:ring-red-500"
                }`}
                type="text"
                label="Nascimento"
                propsInput={{ ...register("datebirth", { required: true }) }}
                error={errors.datebirth?.message}
              />
              <FormFieldText
                classInput={`bg-gray-300 ${
                  errors.genero && "ring-red-500 focus:ring-red-500"
                }`}
                type="text"
                label="Genero"
                propsInput={{ ...register("genero", { required: true }) }}
                error={errors.genero?.message}
              />
            </Box>
            <Box className="grid-cols-1 md:grid-cols-2">
              <FormFieldText
                classInput={`bg-gray-300 ${
                  errors.email && "ring-red-500 focus:ring-red-500"
                }`}
                type="text"
                label="E-mail"
                propsInput={{ ...register("email", { required: true }) }}
                error={errors.email?.message}
              />
              <FormFieldText
                classInput={`bg-gray-300 ${
                  errors.password && "ring-red-500 focus:ring-red-500"
                }`}
                type="password"
                label="Senha"
                propsInput={{ ...register("password", { required: true }) }}
                error={errors.password?.message}
              />
            </Box>
            <Box className="grid-cols-1 md:grid-cols-3">
              <FormFieldText
                classInput={`bg-gray-300 ${
                  errors.nivel && "ring-red-500 focus:ring-red-500"
                }`}
                type="text"
                label="Nivel"
                propsInput={{ ...register("nivel", { required: true }) }}
                error={errors.nivel?.message}
              />
              <FormFieldText
                classInput={`bg-gray-300 ${
                  errors.status && "ring-red-500 focus:ring-red-500"
                }`}
                type="password"
                label="Status"
                propsInput={{ ...register("status", { required: true }) }}
                error={errors.status?.message}
              />
              <FormFieldText
                classInput={`bg-gray-300 ${
                  errors.date && "ring-red-500 focus:ring-red-500"
                }`}
                type="password"
                label="Data"
                propsInput={{ ...register("date", { required: true }) }}
                error={errors.date?.message}
              />
            </Box>
          </div>
        </div>
        <div className="mt-8 w-[90vw] lg:w-[95vw]">
          <div className="p-4 pb-2 w-max bg-gray-200 rounded-xl rounded-b-none">
            PERMISSÕES
          </div>
          <div className="w-[90vw] lg:w-[95vw] flex flex-col gap-4 bg-gray-200 p-6 rounded-xl rounded-tl-none">
            <Box>
              <FormFieldText
                propsInput={{ ...register("permission") }}
                error={errors.permission?.message}
                classInput={`bg-gray-300 ${
                  errors.permission && "ring-red-500 focus:ring-red-500"
                }`}
                type="text"
                label="Permição"
              />
            </Box>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FormRegister;
