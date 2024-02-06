import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import React from "react";

const ListUsers: React.FC = () => {
  return (
    <ContainerDashboard>
      <div className="p-6 w-full h-full flex flex-col justify-start items-center gap-4 ">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full">List Users</div>
      </div>
    </ContainerDashboard>
  );
};

export default ListUsers;
