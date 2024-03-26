"use client";

import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import FormDashboard from "@/components/organisms/FormDashboard";
import React from "react";
import { templateform } from "./templateForm";
import { formSchemaRegisterCourse } from "./schema";
import { registerCourse } from "@/actions/course";

const RegisterCourses: React.FC = () => {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard
            schema={formSchemaRegisterCourse}
            action={registerCourse}
            templateform={templateform}
            pathSuccess="dashboard/courses"
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default RegisterCourses;
