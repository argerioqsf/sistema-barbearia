"use client";

import { EditIcon } from "@/components/Icons/EditIcon";
import { EyeIcon } from "@/components/Icons/EyeIcon";
import { LockIcon } from "@/components/Icons/LockIcon";
import { Text } from "@/components/atoms";
import { mockServer } from "@/components/config/mockServer";
import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import Search from "@/components/molecules/Search";
import Listing from "@/components/organisms/Listing";
import { useItemListTransform } from "@/hooks/use-item-list-transform";
import {
  IndicatorType,
  IndicatorsType,
  ItemListType,
  UserType,
  InfoList,
  Searchs,
} from "@/types/general";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ListRequestIndicators = () => {
  const { listTransform } = useItemListTransform();

  const infoList: InfoList = {
    itemsHeader: ["N", "NOME", "CIDADE", "DATA", ""],
    itemsList: ["name", "", "city", "user_at", ""],
  };

  let list = listTransform(mockServer.indicators, infoList.itemsList);

  function handlerForm(data: any) {
    console.log("handlerForm Search: ", data);
  }

  const renderAvatar = (item: ItemListType, index: number) => {
    return <Text className="text-black">{index + 1}</Text>;
  };

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full flex flex-col justify-start items-center gap-4">
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
            listActions={mockServer.listActionsIndicators}
            hrefButton="dashboard/indicators/register"
            textButton=""
            title="Solicitação para indicadores"
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default ListRequestIndicators;
