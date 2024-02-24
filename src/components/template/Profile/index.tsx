"use client";

import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import FormDashboard from "@/components/organisms/FormDashboard";
import React, { useEffect } from "react";
import { templateform } from "./templateForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHandlerValuesField } from "@/hooks/use-hanlder-values-field";

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

type UserSchema = z.infer<typeof userSchema>;

const Profile: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });
  const { setValuesFieldFromData } = useHandlerValuesField();

  const user = {
    name: "Argério",
    last_name: "Queiroz",
    whatsapp: "",
    documento: "",
    key_pix: "",
    email: "",
    city: "",
    status: "",
    user_at: "",
  };

  useEffect(() => {
    setValuesFieldFromData(templateform, user);
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
            setValue={setValue}
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
