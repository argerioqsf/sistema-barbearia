import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import FormRegister from "@/components/organisms/FormRegister";
import React from "react";

const RegisterIndicators: React.FC = () => {
  const templateform = [
    {
      title: "Cadastrar Indicador",
      textButton: "Cadastrar",
      sections: [
        {
          title: "Dados Pessoais",
          boxs: [
            {
              fields: [
                {
                  id: "name",
                  required: true,
                  type: "text",
                  label: "Nome",
                  messageError: "Must be 2 or more characters long",
                },
                {
                  id: "last_name",
                  required: true,
                  type: "text",
                  label: "Sobrenome",
                  messageError: "Must be 2 or more characters long",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <FormRegister title="Cadastrar Indicador" />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default RegisterIndicators;
