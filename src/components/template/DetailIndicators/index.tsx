"use client";

import { Text } from "@/components/atoms";
import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import { useHandlerMockServer } from "@/hooks/use-handler-mock-server";
import { useItemListTransform } from "@/hooks/use-item-list-transform";
import { Form, IndicatorType, InfoList, ItemListType } from "@/types/general";
import React, { useEffect, useState } from "react";
import DetailDefault from "@/components/organisms/DetailDefault";
import { templates } from "./templates";

const DetailIndicator = ({ id }: { id: string }) => {
  const { listTransform } = useItemListTransform();
  const { getIndicatorForId } = useHandlerMockServer();
  const [indicator, setIndicator] = useState<IndicatorType | null>();
  const [lists, setLists] = useState<InfoList[]>([templates.infoList]);
  const [loading, setLoading] = useState(false);

  function getIndicator(): Promise<any> {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = getIndicatorForId(id)[0];
        setIndicator({ ...response });
        const list: ItemListType[] = listTransform(
          response?.leads,
          templates?.infoList?.itemsList
        );
        lists[0].list = list;
        setLists([...lists]);
        setLoading(false);
        resolve(response);
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

  const forms: Form[] = [
    {
      template: templates.templateform,
      handlerForm: handleRegister,
      getDefaultValues: getIndicator,
      loading: loading,
    },
  ];

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
          titleForm={indicator?.name}
          values={indicator}
          lists={lists}
          forms={forms}
        />
      </div>
    </ContainerDashboard>
  );
};

export default DetailIndicator;
