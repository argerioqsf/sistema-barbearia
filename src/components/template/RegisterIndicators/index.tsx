"use client";

import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import FormDashboard from "@/components/organisms/FormDashboard";
import React from "react";
import { templateform } from "./templateForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const indicatorSchema = z.object({
  name: z.string().min(2, { message: "Must be 2 or more characters long" }),
  last_name: z.string().min(2),
  whatsapp: z.string().min(2),
  documento: z.string().min(2),
  email: z.string().min(2),
  password: z.string().min(2),
  key_pix: z.string().min(2),
  status: z.string().min(2),
  user_at: z.string().min(2),
  city: z.string().min(2),
});

type IndicatorSchema = z.infer<typeof indicatorSchema>;

const RegisterIndicators: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IndicatorSchema>({
    resolver: zodResolver(indicatorSchema),
  });

  function handleRegister(data: IndicatorSchema) {
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

export default RegisterIndicators;
