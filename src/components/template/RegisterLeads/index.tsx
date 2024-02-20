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
  name: z.string().min(2, { message: "Must be 2 or more characters long" }),
  whatsapp: z.string().min(2),
  document: z.string().min(2),
  formation: z.string().min(2),
  email: z.string().min(2),
  unit: z.string().min(2),
  course: z.string().min(2),
  situation: z.string().min(2),
  indicator_id: z.string(),
  consultant: z.string(),
  lead_at: z.string().min(2),
});

type UserSchema = z.infer<typeof userSchema>;

const RegisterLeads: React.FC = () => {
  const [templateformState, setTemplateformState] = useState(templateform);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  function handleRegister(data: UserSchema) {
    console.log("data FormDashboard: ", data);
  }
  useEffect(() => {
    templateformState.sections[0].boxs[3].fields[0].options = [
      {
        label: "",
        value: null,
      },
      {
        label: "option1",
        value: 1,
      },
      {
        label: "option2",
        value: 2,
      },
      {
        label: "option3",
        value: 3,
      },
    ];
    templateformState.sections[0].boxs[3].fields[1].options = [
      {
        label: "",
        value: null,
      },
      {
        label: "option4",
        value: 4,
      },
      {
        label: "option5",
        value: 5,
      },
      {
        label: "option6",
        value: 6,
      },
    ];
    setTemplateformState({ ...templateformState });
  }, []);

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard
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

export default RegisterLeads;
