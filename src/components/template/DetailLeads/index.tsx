"use client";

import { Text } from "@/components/atoms";
import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import { useHandlerMockServer } from "@/hooks/use-handler-mock-server";
import { useItemListTransform } from "@/hooks/use-item-list-transform";
import { IndicatorType, ItemListType, Lead } from "@/types/general";
import React, { useState } from "react";
import * as templates from "./templates";
import DetailDefault from "@/components/organisms/DetailDefault";

const DetailLeads = ({ id }: { id: string }) => {
  const { listTransform } = useItemListTransform();
  const { getLeadForId } = useHandlerMockServer();
  const [indicator, setIndicator] = useState<Lead | null>();

  function getIndicator(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = getLeadForId(id);
        setIndicator({ ...data[0] });
        resolve(data[0]);
      }, 2000);
    });
  }

  const renderAvatar = (item: ItemListType, index: number) => {
    return <Text className="text-black">{index + 1}</Text>;
  };

  function handlerFormSearch(data: object) {
    console.log("handlerForm Search: ", data);
  }

  function handleRegister(data: any) {
    console.log("data FormDashboard: ", data);
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <DetailDefault
          renderAvatar={renderAvatar}
          handlerFormSearch={handlerFormSearch}
          handleRegister={handleRegister}
          getDefaultValues={getIndicator}
          templates={templates}
          titleForm={indicator?.name}
          values={indicator}
        />
      </div>
    </ContainerDashboard>
  );
};

export default DetailLeads;
