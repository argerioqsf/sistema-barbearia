"use client";

import { EditIcon } from "@/components/Icons/EditIcon";
import { EyeIcon } from "@/components/Icons/EyeIcon";
import { LockIcon } from "@/components/Icons/LockIcon";
import { mockServer } from "@/components/config/mockServer";
import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import Search from "@/components/molecules/Search";
import Listing from "@/components/organisms/Listing";
import { useItemListTransform } from "@/hooks/use-item-list-transform";
import { ItemListType, UserType, OrderItemsList } from "@/types/general";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ListUsers: React.FC = () => {
  const { listTransform } = useItemListTransform();
  const orderItemsList: OrderItemsList = {
    itemsHeader: ["NOME", "E-MAIL", "NUMERO", "STATUS"],
    itemsList: ["name", "", "email", "number", "status"],
  };
  let list = listTransform(mockServer.users, orderItemsList.itemsList);

  const searchSchema = z.object({
    search: z.string().min(2, { message: "Must be 2 or more characters long" }),
  });

  type SearchSchemaType = z.infer<typeof searchSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
  });

  const renderAvatar = (item: ItemListType, index: number) => {
    return (
      <Image
        className="align-middle rounded-full m-0 p-0 aspect-square"
        src="https://img.myloview.com.br/adesivos/humano-homem-pessoa-avatar-perfil-do-usuario-vector-icon-ilustracao-700-80949473.jpg"
        width={40}
        height={40}
        alt={"avatar"}
      />
    );
  };

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4 ">
        <div className="w-full ">
          <Breadcrumb />
        </div>
        <div className="w-full mt-6">
          <Search propsInput={{ ...register("search") }} />
        </div>
        <div className="w-full mt-6 lg:mt-8">
          <Listing
            itemsHeader={orderItemsList.itemsHeader}
            avatar={renderAvatar}
            list={list}
            listActions={mockServer.listActionsUsers}
            hrefButton="dashboard/users/register"
            textButton="Novo usuário"
            title="Usuários"
          />
        </div>
      </div>
    </ContainerDashboard>
  );
};

export default ListUsers;
