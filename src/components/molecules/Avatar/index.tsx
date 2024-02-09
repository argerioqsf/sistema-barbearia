import { UserIcon } from "@/components/Icons/UserIcon";
import LinkDefault from "@/components/atoms/LinkDefault";
import { useHandlerIcons } from "@/hooks/use-handler-Icons";
import { IconSvgProps } from "@/types/general";
import Image from "next/image";
import React, { FC, ReactNode, SVGProps } from "react";
import { twMerge } from "tailwind-merge";

type AvatarProps = {
  href?: string;
  classIcon?: string;
  size?: number;
  image?: string;
  alt?: string;
  icon?: string;
  colorIcon?: string;
  children?: React.ReactNode;
};

const Avatar: React.FC<AvatarProps> = ({
  href = "#",
  classIcon = "",
  colorIcon = "white",
  size = 36,
  image = "",
  icon = "",
  alt = "",
  children,
}) => {
  const renderIcon = useHandlerIcons(icon);

  return (
    <div className={twMerge(`size-[${size}px]`)}>
      <LinkDefault className="flex justify-center items-center" href={href}>
        {image ? (
          <Image
            className="align-middle rounded-full m-0 p-0 aspect-square"
            src={image}
            width={size}
            height={size}
            alt={alt}
          />
        ) : (
          <div
            className={twMerge(
              "p-2 rounded-full flex justify-center items-center border-2",
              classIcon
            )}
          >
            {children ?? renderIcon({ size, color: colorIcon })}
          </div>
        )}
      </LinkDefault>
    </div>
  );
};

export default Avatar;
