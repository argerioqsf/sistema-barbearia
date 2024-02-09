import { FC, SVGProps } from "react";

export type ParamsProp = {
  locale: string;
};

export type IconSvgProps = {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
};

export type ListActionsProps = {
  id: number;
  onclick?: () => void;
  icon: string;
  href?: string;
  name?: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  number: string;
  status: string;
};

export type UserHookType = "id" | "name" | "email" | "number" | "status";

export type ItemListType = {
  id: number;
  info1: string;
  info2: string;
  info3: string;
  info4: string;
};

export type ItemListHookType = "id" | "info1" | "info2" | "info3" | "info4";

export type IndicatorsType = {
  id: number;
  name: string;
  cidade: string;
  link: string;
  data: string;
};

export type IndicatorsHookType = "id" | "name" | "cidade" | "link" | "data";
