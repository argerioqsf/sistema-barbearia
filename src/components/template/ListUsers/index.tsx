"use client";

import { EditIcon } from "@/components/Icons/EditIcon";
import { EyeIcon } from "@/components/Icons/EyeIcon";
import { LockIcon } from "@/components/Icons/LockIcon";
import { mockServer } from "@/components/config/mockServer";
import { ContainerDashboard } from "@/components/molecules";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import Search from "@/components/molecules/Search";
import Listing from "@/components/organisms/Listing";
import { useUserListTransform } from "@/hooks/use-item-list-transform";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ListUsers: React.FC = () => {
  let list = useUserListTransform(mockServer.users, [
    "name",
    "email",
    "number",
    "status",
  ]);
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
