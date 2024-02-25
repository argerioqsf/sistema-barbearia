"use client";

import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import FormDashboard from "@/components/organisms/FormDashboard";
import React, { useEffect, useState } from "react";
import { templateform } from "./templateForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const userSchema = z.object({
  name: z.string().min(1),
  last_name: z.string().min(1),
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
  key_pix: z.string().min(2),
  documento: z.string().min(2),
  datebirth: z.string().min(2),
  genero: z.string().min(2),
  email: z.string().min(2),
  password: z.string().min(2),
  nivel: z.string().min(2),
  status: z.number({ required_error: "Nome é obrigatório para o cadastro!" }),
  user_at: z.string().min(2),
  permission: z.string().min(2),
  city: z.string().min(2),
});

type UserSchema = z.infer<typeof userSchema>;

const Profile: React.FC = () => {
  const [user, setUser] = useState<{} | null>(null);

  function getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = {
          name: "Argério",
          last_name: "Queiroz",
          whatsapp: "34234234",
          documento: "23424",
          key_pix: "23424234",
          email: "asdasdasds",
          city: "weewewrw",
          status: 1,
          user_at: "2012-12-12",
        };
        setUser(data);
        resolve(data);
      }, 2000);
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    defaultValues: async () => getUser(),
    resolver: zodResolver(userSchema),
  });

  function handleRegister(data: UserSchema) {
    console.log("data FormDashboard: ", data);
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard
            loading={!user}
            handlerForm={handleRegister}
            templateform={templateform}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default Profile;
