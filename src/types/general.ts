import { FC, SVGProps } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { z } from "zod";

export type ParamsProp = {
  locale: string;
  id?: string;
};

export type Segment = {
  id: number;
  name: string;
  created_at: string;
};

export type Course = {
  id: number;
  name: string;
  quant_leads: number;
  status: number;
};

export type Unit = {
  id: number;
  name: string;
  created_at: string;
  segments: Segment[];
  courses: Course[];
};

type LimitFields<T> = [T, T, T, T, T];

type LimitFieldsForm<T> = [T, ...T[]] & {
  length: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export type FieldsList = LimitFields<UserHookType | "">;

export type IconSvgProps = {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
};

export type ListActionsProps = {
  id: number;
  onclick?: (id: any) => void;
  icon: string;
  href?: string;
  name?: string;
};

export type InfoList = {
  itemsHeader: Array<string>;
  itemsList: FieldsList;
  listActions?: ListActionsProps[];
  title?: string;
  list?: ItemListType[];
  hrefButton?: string;
  textButton?: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  number: string;
  status: number;
  image: string;
  last_name: string;
  whatsapp: string;
  document: string;
  datebirth: string;
  genero: number;
  nivel: number;
  created_at: string;
};

export type IndicatorType = {
  id: number;
  name: string;
  last_name?: string;
  city: string;
  link: string;
  whatsapp: string;
  user_at: string;
  document: string;
  key_pix: string;
  email: string;
  status: string;
  leads?: Lead[];
};

export type Lead = {
  id: number;
  name: string;
  whatsapp: string;
  document: string;
  key_pix: string;
  email: string;
  city: string;
  training_course: string;
  indicator_id?: number;
  indicator: IndicatorType | {};
  status: string;
  created_at: string;
  updated_at: string;
  time_line?: TimeLine[];
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
  | "city"
  | "link"
  | "data"
  | "user_at"
  | "number_courses"
  | "created_at"
  | `segments.${string}`
  | `courses.${string}`
  | "quant_leads"
  | "active";

type typesForIdFieldsForm =
  | "name"
  | "last_name"
  | "status"
  | "date"
  | "whatsapp"
  | "document"
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
  | "lead_at"
  | "segments"
  | "courses"
  | "search"
  | "created_at"
  | "training_course"
  | "course_id"
  | "title"
  | "describe"
  | "active";

export type FieldsFormSchema = {
  name?: z.ZodString;
  last_name?: z.ZodString;
  whatsapp?: z.ZodString;
  document?: z.ZodString;
  email?: z.ZodString;
  password?: z.ZodString;
  key_pix?: z.ZodString;
  status?: z.ZodString;
  user_at?: z.ZodString;
  city?: z.ZodString;
  datebirth?: z.ZodString;
  genero?: z.ZodString;
  nivel?: z.ZodString;
  permission?: z.ZodString;
  image?: z.ZodString;
  unit?: z.ZodString;
  formation?: z.ZodString;
  course?: z.ZodString;
  situation?: z.ZodString;
  indicator_id?: z.ZodNumber;
  consultant?: z.ZodString;
  lead_at?: z.ZodString;
  segments?: z.ZodString;
  courses?: z.ZodString;
  date?: z.ZodString;
  search?: z.ZodString;
  training_course?: z.ZodString;
  created_at?: z.ZodString;
  course_id?: z.ZodNumber;
  title?: z.ZodString;
  describe?: z.ZodString;
  active?: z.ZodBoolean;
};

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

export type SectionTemplateForm = {
  id: number;
  title: string;
  boxs: Array<BoxTemplateForm>;
};

export type BoxTemplateForm = {
  id: number;
  fields: LimitFieldsForm<FieldsTemplateForm>;
};

export type FieldsTemplateForm = {
  id: typesForIdFieldsForm;
  required: boolean;
  type: "text" | "date" | "image" | "select" | "password" | "file";
  label: string;
  messageError?: string;
  classInput?: string;
  options?: Array<OptionsTemplateForm>;
  value?: string | number;
  disabled?: boolean;
  roles?: Roles;
};

type Roles = {
  minCaracters?: number;
};

export type OptionsTemplateForm = {
  label: string;
  value: number | string;
};

type NamesSearchs = "search";

export type Searchs = Array<{
  id?: number;
  propsInput: UseFormRegisterReturn<string>;
  placeholder: string;
  name: NamesSearchs;
}>;

export type LimitColsGrid = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type TimeLine = {
  id: number;
  lead_id: number;
  course_id: number;
  title: string;
  describe: string;
  status: string;
  created_at: string;
};

export type Form = {
  template: Templateform;
  handlerForm: (state: any) => void;
  getDefaultValues?: () => Promise<any>;
  loading?: boolean;
};

export type ListAction = {
  id: number;
  onclick?: (id: any) => void;
  icon: string;
  href?: string;
  name: string;
};
