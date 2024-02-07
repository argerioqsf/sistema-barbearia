import { UserIcon } from "@/components/Icons/UserIcon";
import LinkDefault from "@/components/atoms/LinkDefault";
import { IconSvgProps } from "@/types/general";
import Image from "next/image";
import React, { FC, ReactNode, SVGProps } from "react";
import { twMerge } from "tailwind-merge";

type AvatarProps = {
  href?: string;
  bgColorIcon?: string;
  bdColor?: string;
  size?: number;
  image?: string;
  alt?: string;
  icon?: FC<IconSvgProps>;
  colorIcon?: string;
  children?: React.ReactNode;
};

const Avatar: React.FC<AvatarProps> = ({
  href = "#",
  bgColorIcon = "yellow-300",
  bdColor = "primary-100",
  colorIcon = "white",
  size = 36,
  image = "",
  icon = () => <UserIcon size={size} color="white" />,
  alt = "",
  children,
}) => {
  return (
    <div className={twMerge(`size-[${size}px]`)}>
      <LinkDefault className="flex justify-center items-center " href={href}>
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
              `size-[${size}px]`,
              "p-2 rounded-full flex justify-center items-center border-2",
              `bg-${bgColorIcon}`,
              `border-${bdColor}`
            )}
          >
            {children ?? icon({ size, color: colorIcon })}
          </div>
        )}
      </LinkDefault>
    </div>
  );
};

export default Avatar;
