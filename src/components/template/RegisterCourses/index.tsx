"use client";

import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import FormDashboard from "@/components/organisms/FormDashboard";
import React from "react";
import { templateform } from "./templateForm";

const RegisterCourses: React.FC = () => {
  function handleRegister(data: any) {
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
            handlerForm={handleRegister}
            templateform={templateform}
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default RegisterCourses;
