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
import { ItemListType, OrderItemsHeaderList, Searchs } from "@/types/general";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ListLeads: React.FC = () => {
  const { listTransform } = useItemListTransform();

  const OrderItemsHeaderList: OrderItemsHeaderList = {
    itemsHeader: ["N", "NOME / WHATSAPP", "CURSO", "INDICADOR", "STATUS"],
    itemsList: [
      "name",
      "whatsapp",
      "training_course",
      "indicator.name",
      "status",
    ],
  };

  let list = listTransform(mockServer.leads, OrderItemsHeaderList.itemsList);

  const searchSchema = z.object({
    search: z.string(),
  });

  type SearchSchemaType = z.infer<typeof searchSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
  });

  const searchs: Searchs = [
    {
      id: 1,
      propsInput: { ...register("search") },
      placeholder: "Search...",
      name: "search",
    },
  ];

  function handlerForm(data: SearchSchemaType) {
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
          <Search handlerForm={handleSubmit(handlerForm)} searchs={searchs} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            itemsHeader={OrderItemsHeaderList.itemsHeader}
            avatar={renderAvatar}
            list={list}
            listActions={mockServer.listActionsLeads}
            hrefButton="dashboard/leads/register"
            textButton="Novo lead"
            title="Leads"
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default ListLeads;
