import { Avatar, ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import Search from "@/components/molecules/Search";
import Listing from "@/components/organisms/Listing";
import React from "react";

const ListUsers: React.FC = () => {
  return (
    <ContainerDashboard>
      <div className="p-[5vw] md:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4 ">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing title="Usuários" />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default ListUsers;
