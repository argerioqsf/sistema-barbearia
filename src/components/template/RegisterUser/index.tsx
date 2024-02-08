import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import FormRegister from "@/components/organisms/FormRegister";
import React from "react";

const RegisterUser: React.FC = () => {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4 ">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormRegister title="Cadastrar Usuário" />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default RegisterUser;
