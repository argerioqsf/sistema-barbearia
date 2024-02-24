import { FC, SVGProps } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

export type ParamsProp = {
  locale: string;
};

type LimitFields<T> = [T, T, T, T, T];

export type FieldsList = LimitFields<UserHookType | "">;

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

export type OrderItemsList = {
  itemsHeader: Array<string>;
  itemsList: FieldsList;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  number: string;
  status: string;
  image: string;
};

export type IndicatorType = {
  id: number;
  name: string;
  cidade: string;
  link: string;
  data: string;
};

export type UserHookType =
  | "id"
  | "name"
  | "email"
  | "number"
  | "status"
  | "whatsapp"
  | "training_course"
  | `indicator.${string}`
  | "cidade"
  | "link"
  | "data"
  | "number_courses"
  | "created_at";

export type ItemListType = {
  id: number;
  info1: string;
  info2: string;
  info3: string;
  info4: string;
  info5: string;
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

export type Templateform = {
  title: string;
  textButton: string;
  sections: Array<SectionTemplateForm>;
};

type SectionTemplateForm = {
  id: number;
  title: string;
  boxs: Array<BoxTemplateForm>;
};

export type BoxTemplateForm = {
  id: number;
  fields: Array<FieldsTemplateForm>;
};

export type FieldsTemplateForm = {
  id: typesForIdFieldsForm;
  required: boolean;
  type: "text" | "date" | "image" | "select" | "password" | "file";
  label: string;
  messageError?: string;
  classInput?: string;
  options?: Array<OptionsTemplateForm>;
  value?: string;
};

export type OptionsTemplateForm = {
  label: string;
  value: number | null;
};

type typesForIdFieldsForm =
  | "name"
  | "last_name"
  | "image"
  | "status"
  | "date"
  | "whatsapp"
  | "documento"
  | "datebirth"
  | "genero"
  | "email"
  | "password"
  | "nivel"
  | "permission"
  | "image"
  | "key_pix"
  | "user_at"
  | "city"
  | "unit"
  | "formation"
  | "course"
  | "document"
  | "situation"
  | "indicator_id"
  | "consultant"
  | "lead_at";

type NamesSearchs = "search";

export type Searchs = Array<{
  id: number;
  propsInput: UseFormRegisterReturn<string>;
  placeholder: string;
  name: NamesSearchs;
}>;
