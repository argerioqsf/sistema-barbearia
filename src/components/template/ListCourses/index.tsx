"use client";

import { Text } from "@/components/atoms";
import { mockServer } from "@/components/config/mockServer";
import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import Search from "@/components/molecules/Search";
import Listing from "@/components/organisms/Listing";
import { useItemListTransform } from "@/hooks/use-item-list-transform";
import { ItemListType, InfoList, Searchs } from "@/types/general";
import React from "react";

const ListCourses: React.FC = () => {
  const { listTransform } = useItemListTransform();
  const infoList: InfoList = {
    itemsHeader: ["N", "NOME", "STATUS", " QUANT. LEADS", ""],
    itemsList: ["name", "", "status", "quant_leads", ""],
  };
  let list = listTransform(mockServer.cursos, infoList.itemsList);

  const renderAvatar = (item: ItemListType, index: number) => {
    return <Text className="text-black">{index + 1}</Text>;
  };

  function handlerForm(data: any) {
    console.log("handlerForm Search: ", data);
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4 mb-6">
        <div className="w-full">
          <Breadcrumb />
        </div>

        <div className="w-full mt-6">
          <Search handlerForm={handlerForm} />
        </div>

        <div className="w-full mt-6 lg:mt-8">
          <Listing
            itemsHeader={infoList.itemsHeader}
            avatar={renderAvatar}
            list={list}
            listActions={mockServer.listActionsCourses}
            hrefButton="dashboard/courses/register"
            textButton="Novo Curso"
            title="Cursos"
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default ListCourses;
