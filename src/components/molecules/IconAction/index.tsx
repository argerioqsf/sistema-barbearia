import { Button } from "@/components/atoms";
import LinkDefault from "@/components/atoms/LinkDefault";
import { useHandlerIcons } from "@/hooks/use-handler-icons";
import { useHandlerRouter } from "@/hooks/use-handler-router";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

type AvatarProps = {
  classIcon?: string;
  size?: number;
  icon?: string;
  colorIcon?: string;
  children?: React.ReactNode;
  onClick?: (state: any) => void;
  href?: string;
};

const IconAction: React.FC<AvatarProps> = ({
  href = "",
  classIcon = "",
  colorIcon = "white",
  size = 36,
  icon = "",
  children,
  onClick,
}) => {
  const renderIcon = useHandlerIcons(icon);
  const { generatePath } = useHandlerRouter();
  return href.length > 0 ? (
    <LinkDefault
      className="flex justify-center items-center"
      href={generatePath(href)}
    >
      <span
        className={twMerge(
          "p-2 rounded-full flex justify-center items-center border-2",
          classIcon
        )}
      >
        {children ?? renderIcon({ size, color: colorIcon })}
      </span>
    </LinkDefault>
  ) : (
    <Button
      onClick={onClick}
      type="button"
      className="flex justify-center items-center p-0"
    >
      <span
        className={twMerge(
          "p-2 rounded-full flex justify-center items-center border-2",
          classIcon
        )}
      >
        {children ?? renderIcon({ size, color: colorIcon })}
      </span>
    </Button>
  );
};

export default IconAction;
