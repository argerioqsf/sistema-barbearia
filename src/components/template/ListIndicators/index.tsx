"use client";

import { Text } from "@/components/atoms";
import { mockServer } from "@/components/config/mockServer";
import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import Search from "@/components/molecules/Search";
import Listing from "@/components/organisms/Listing";
import { useItemListTransform } from "@/hooks/use-item-list-transform";
import { ItemListType, InfoList } from "@/types/general";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ListIndicators = () => {
  const { listTransform } = useItemListTransform();

  const infoList: InfoList = {
    itemsHeader: ["N", "NOME", "CIDADE", "DATA", ""],
    itemsList: ["name", "", "city", "user_at", ""],
  };

  type ListActionsIndicators = {
    id: number;
    onclick?: (id: any) => void;
    icon: string;
    href?: string;
    name: string;
  };

  const listActionsIndicators: ListActionsIndicators[] = [
    {
      id: 1,
      icon: "Edit",
      name: "Editar",
      onclick: (id: string) => {
        console.log("editar: ", id);
      },
    },
    {
      id: 2,
      icon: "Eye",
      href: "indicators/",
      name: "Vizualizar",
    },
    {
      id: 3,
      icon: "Lock",
      href: "home",
      name: "Desativar",
    },
    {
      id: 4,
      icon: "Link",
      href: "home",
      name: "Link",
    },
  ];

  let list = listTransform(mockServer.indicators, infoList.itemsList);

  function handlerForm(data: any) {
    console.log("handlerForm Search: ", data);
  }

  const renderAvatar = (item: ItemListType, index: number) => {
    return <Text className="text-black">{index + 1}</Text>;
  };

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
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
            listActions={listActionsIndicators}
            hrefButton="dashboard/indicators/register"
            textButton="Novo indicador"
            title="Indicadores"
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default ListIndicators;
