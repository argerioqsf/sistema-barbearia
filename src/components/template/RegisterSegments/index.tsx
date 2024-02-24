"use client";

import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import FormDashboard from "@/components/organisms/FormDashboard";
import React, { useEffect, useState } from "react";
import { templateform } from "./templateForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const userSchema = z.object({
  name: z.string().min(2, { message: "Must be 2 or more characters long" }),
});

type UserSchema = z.infer<typeof userSchema>;

const RegisterSegments: React.FC = () => {
  const [templateformState, setTemplateformState] = useState(templateform);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserSchema>({
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
            setValue={setValue}
            handlerForm={handleRegister}
            templateform={templateformState}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default RegisterSegments;
