import { Button } from "@/components/atoms";
import LinkDefault from "@/components/atoms/LinkDefault";
import { useHandlerIcons } from "@/hooks/use-handler-icons";
import Image from "next/image";
import React from "react";
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
  href = "",
  classIcon = "",
  colorIcon = "white",
  size = 36,
  image = "",
  icon = "",
  alt = "",
  children,
}) => {
  const renderIcon = useHandlerIcons(icon);
  const Component = href.length > 0 ? LinkDefault : "div";
  return (
    <div className={twMerge(`size-[${size}px]`)}>
      <Component className="flex justify-center items-center" href={href}>
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
      </Component>
    </div>
  );
};

export default Avatar;
