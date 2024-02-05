import { Text } from "@/components/atoms";
import LinkDefault from "@/components/atoms/LinkDefault";
import React from "react";

type InfoUserNavProps = {
  nameUser: string;
};

const InfoUserNav: React.FC<InfoUserNavProps> = ({ nameUser }) => {
  return (
    <div className="pt-1">
      <Text className="text-indigo-500">{nameUser}</Text>
      <LinkDefault className="text-base text-indigo-600 font-bold" href={"#"}>
        SAIR
      </LinkDefault>
    </div>
  );
};

export default InfoUserNav;
