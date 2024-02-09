"use client";

import { EditIcon } from "@/components/Icons/EditIcon";
import { EyeIcon } from "@/components/Icons/EyeIcon";
import { LockIcon } from "@/components/Icons/LockIcon";
import { Button, Text } from "@/components/atoms";
import ItemList from "@/components/molecules/ItemList";
import { useRouter } from "next/navigation";
import React from "react";

type ListingProps = {
  title: string;
};

const Listing = ({ title }: ListingProps) => {
  const router = useRouter();
  const listActions = [
    {
      id: 1,
      onclick: () => {},
      icon: EditIcon,
      href: "users/edit",
    },
    {
      id: 2,
      onclick: () => {},
      icon: EyeIcon,
      href: "home",
    },
    {
      id: 3,
      onclick: () => {},
      icon: LockIcon,
      href: "home",
    },
  ];

  const users = [
    {
      id: 1,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
    {
      id: 2,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
    {
      id: 3,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
    {
      id: 4,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
    {
      id: 5,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
    {
      id: 6,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
    {
      id: 7,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
    },
  ];

  return (
    <div className="w-full">
      <div className="w-[90vw] lg:w-[95vw] flex flex-row justify-between items-center">
        <Text className="uppercase font-bold text-2xl lg:text-4xl text-black">
          {title}
        </Text>
        <Button
          onClick={() => router.push("users/register")}
          className="rounded-xl h-10 flex justify-center items-center px-2 sm:px-5 md:px-10 bg-secondary-50 text-white"
          type="button"
        >
          Novo usuário
        </Button>
      </div>

      <div className="w-full mt-10 flex flex-col gap-4 pb-10">
        {users.map((user, index) => (
          <ItemList
            key={user.id}
            listActions={listActions}
            avatar={<Text className="text-black">{index + 1}</Text>}
            info1={user.name}
            info2={user.email}
            info3={user.number}
            info4={user.status}
          />
        ))}
      </div>
    </div>
  );
};

export default Listing;
