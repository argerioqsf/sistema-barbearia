"use client";

import { Text } from "@/components/atoms";
import { mockServer } from "@/components/config/mockServer";
import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import Search from "@/components/molecules/Search";
import FormDashboard from "@/components/organisms/FormDashboard";
import Listing from "@/components/organisms/Listing";
import { useHandlerMockServer } from "@/hooks/use-handler-mock-server";
import { useItemListTransform } from "@/hooks/use-item-list-transform";
import {
  IndicatorType,
  ItemListType,
  OrderItemsHeaderList,
} from "@/types/general";
import React, { useState } from "react";
import { orderItemsHeaderList, templateform, templateformSearch } from "./templates";
import { useHandlerForm } from "@/hooks/use-hanlder-form";

const DetailIndicator = ({ id }: { id: string }) => {
  const { listTransform } = useItemListTransform();
  const { getIndicatorForId } = useHandlerMockServer();
  const [indicator, setIndicator] = useState<IndicatorType | null>();
  const [list, setList] = useState<ItemListType[] | null>(null);
  const { register: registerS, handleSubmit: handleSubmitS, errors: errorsS  } = useHandlerForm(templateformSearch.sections)
  // const { register, handleSubmit, errors  } = useHandlerForm(templateform.sections,getIndicator)

  function getIndicator(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = getIndicatorForId(id);
        setIndicator({ ...data[0] });
        const list_:ItemListType[] = listTransform(data[0]?.leads, orderItemsHeaderList.itemsList);
        setList(list_);
        console.log('resolve:',data[0])
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
        <div className="w-full mt-6 lg:mt-8">
          <FormDashboard
            loading={!indicator}
            handlerForm={handleRegister}
            templateform={templateform}
            getDefaultValues={getIndicator}
          />
        </div>
        <div className="w-full mt-6">
          <Search handlerForm={handleSubmitS(handlerFormSearch)} register={registerS} />
        </div>
        <div className="w-full mt-6 lg:mt-8 mb-4">
          <Listing
            itemsHeader={orderItemsHeaderList.itemsHeader}
            avatar={renderAvatar}
            list={list}
            listActions={mockServer.listActionsConfirmedLeads}
            hrefButton="dashboard/leads/register"
            textButton=""
            title={`Leads`}
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default DetailIndicator;
