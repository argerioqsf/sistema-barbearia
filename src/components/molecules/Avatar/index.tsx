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
  icon?: FC<IconSvgProps>;
};

const Avatar: React.FC<AvatarProps> = ({
  href = "#",
  bgColor = "white",
  bdColor = "primary-100",
  size = 36,
  image = "",
  icon = () => <UserIcon size={size} color="white" />,
  alt = "",
}) => {
  return (
    <div
      className={twMerge(
        "rounded-full flex flex-col items-center justify-center border-2 border-primary-100",
        "size-[" + size + "px]",
        `bg-${bgColor}`,
        `border-${bdColor}`
      )}
    >
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
          <div className="p-2">{icon({ size, color: "white" })}</div>
        )}
      </LinkDefault>
    </div>
  );
};

export default Avatar;
