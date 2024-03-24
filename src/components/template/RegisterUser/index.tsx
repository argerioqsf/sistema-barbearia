"use client";

import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import FormDashboard from "@/components/organisms/FormDashboard";
import React, { useEffect, useState } from "react";
import { templateform } from "./templateForm";
import { registerUserProfile } from "@/actions/user";
import { formSchemaRegisterUserProfile } from "./schema";
import { getRolesFromCookie } from "@/utils/cookieClient";
import { OptionsTemplateForm } from "@/types/general";

const RegisterUser: React.FC = () => {
const [ template, setTemplate] = useState(templateform)
useEffect(()=>{
  let options: OptionsTemplateForm[]  = [
    {
      label: "Selecione",
      value: "",
    }
  ]
  const roles = getRolesFromCookie()
  for (const key in roles) {
    console.log(key, roles[key]);
    options = [
      ...options,
      {
        label: roles[key] as string,
        value: roles[key] as string,
      }
    ]
  }
  template.sections[1].boxs[0].fields[0].options = options
},[template.sections])

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4 ">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard
            schema={formSchemaRegisterUserProfile}
            action={registerUserProfile}
            templateform={templateform}
            pathSuccess="dashboard/users"
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default RegisterUser;
