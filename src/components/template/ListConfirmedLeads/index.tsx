"use client";

import { Text } from "@/components/atoms";
import { mockServer } from "@/components/config/mockServer";
import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import Search from "@/components/molecules/Search";
import Listing from "@/components/organisms/Listing";
import { useItemListTransform } from "@/hooks/use-item-list-transform";
import { ItemListType } from "@/types/general";
import React from "react";
import { infoList, templateformSearch } from "./templates";
import { useHandlerForm } from "@/hooks/use-hanlder-form";

const ListConfirmedLeads: React.FC = () => {
  const { listTransform } = useItemListTransform();

  const {
    register: registerS,
    handleSubmit: handleSubmitS,
    errors: errorsS,
  } = useHandlerForm(templateformSearch.sections);

  let list = listTransform(mockServer.leads, infoList.itemsList);

  function handlerForm(data: object) {
    console.log("handlerForm Search: ", data);
  }

  const renderAvatar = (item: ItemListType, index: number) => {
    return <Text className="text-black">{index + 1}</Text>;
  };

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search handlerForm={handleSubmitS(handlerForm)} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            itemsHeader={infoList.itemsHeader}
            avatar={renderAvatar}
            list={list}
            listActions={mockServer.listActionsConfirmedLeads}
            hrefButton="dashboard/leads/register"
            textButton=""
            title="Leads Confirmados"
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default ListConfirmedLeads;
