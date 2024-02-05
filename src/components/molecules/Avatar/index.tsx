import { UserIcon } from "@/components/Icons/UserIcon";
import LinkDefault from "@/components/atoms/LinkDefault";
import { IconSvgProps } from "@/types/general";
import Image from "next/image";
import React, { FC, ReactNode, SVGProps } from "react";
import { twMerge } from "tailwind-merge";

type AvatarProps = {
  href?: string;
  bgColor?: string;
  bdColor?: string;
  size?: number;
  image?: string;
  alt?: string;
  icon?: ReactNode;
};

const Avatar: React.FC<AvatarProps> = ({
  href = "#",
  bgColor = "primary-100",
  bdColor = "primary-100",
  size = 36,
  image = "",
  icon,
  alt = "",
}) => {
  return (
    <div
      className={twMerge(
        "rounded-full flex flex-row items-center justify-center border-2 p-1 border-primary-100",
        `w-[${size}px] h-[${size}px]`,
        `bg-${bgColor}`,
        `border-${bdColor}`
      )}
    >
      <LinkDefault href={href}>
        {image ? (
          <Image
            className="align-middle rounded-full m-0 p-0 aspect-square"
            src={image}
            width={size}
            height={size}
            alt={alt}
          />
        ) : icon ? (
          icon
        ) : (
          <UserIcon size={size} color="white" />
        )}
      </LinkDefault>
    </div>
  );
};

export default Avatar;
