"use client";

import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import FormDashboard from "@/components/organisms/FormDashboard";
import React, { useState } from "react";
import { templateform } from "./templateForm";
const Profile: React.FC = () => {
  const [user, setUser] = useState<{} | null>(null);

  function getUser(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          name: "Argério",
          last_name: "Queiroz",
          whatsapp: "34234234",
          document: "23424",
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

  function handleRegister(data: object) {
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
            getDefaultValues={getUser}
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default Profile;
