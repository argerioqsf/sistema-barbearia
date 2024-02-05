import { SVGProps } from "react";

export type ParamsProp = {
  locale: string;
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
