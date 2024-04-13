import { DefaultValues, FieldValues, Path } from 'react-hook-form'
import { z } from 'zod'

type LimitFieldsForm<G> = [G, ...G[]] & {
  length: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

type LimitFields<T> = [T, T, T, T, T]

export type Segment = {
  id: string
  name: string
  created_at: string
}

export type SegmentProps = keyof Segment

export type Course = {
  id: string
  name: string
  quant_leads: number
  status: string
}

export type CourseProps = keyof Course

export type Unit = {
  id: string
  name: string
  created_at?: string
  segments?: { segment: Segment }[] | []
  courses?: { course: Course }[] | []
}

export type UnitProps = keyof Unit

export type User = {
  id: string
  name: string
  email: string
  active: string
  // eslint-disable-next-line no-use-before-define
  profile: Profile
  created_at: string
}

export type UserProps = keyof User

export type Profile = {
  id: string
  phone: string
  cpf: string
  genre: string
  birthday: string
  pix: string
  role: string
  user?: User
  userId: string
  // eslint-disable-next-line no-use-before-define
  leadsIndicator?: Lead[]
}

export type ProfileProps = keyof Profile

export type TimeLine = {
  id: string
  lead_id: string
  course_id: string
  title: string
  describe: string
  status: string
  created_at: string
}

export type TimeLineProps = keyof TimeLine

export type Lead = {
  id: string
  name: string
  phone: string
  document: string
  email: string
  city: string
  indicator?: Profile
  indicatorId: string
  consultant?: Profile
  consultantId?: string
  timeline: TimeLine[]
}

export type LeadProps = keyof Lead

export type Models = Segment | User | Unit | Course | TimeLine | Profile | Lead

const fieldsForm = [
  'id',
  'name',
  'created_at',
  'quant_leads',
  'status',
  'segments',
  'indicators',
  'courses',
  'email',
  'active',
  'profile',
  'phone',
  'cpf',
  'genre',
  'birthday',
  'pix',
  'role',
  'user',
  'userId',
  'lead_id',
  'course_id',
  'title',
  'describe',
  '',
  'profile.cpf',
  'indicator.name',
  '_count.segments',
  '_count.courses',
  'password',
  'search',
  'indicatorId',
  'consultantId',
  'image',
  'request',
  'indicator.cpf',
  'user.name',
  'user.email',
  'user.active',
  'default',
  'lead.id',
  'profile.role',
  'profile.phone',
  'profile.cpf',
  'profile.birthday',
  'profile.genre',
  'profile.pix',
  'q',
  'segment.name',
  'segmentId'
] as const

export type ParamsProp = {
  locale: string
  id?: string
}

type BaseUserHookType = {
  [K in (typeof fieldsForm)[number]]: string
}

export type UserHookType = keyof BaseUserHookType

export type TypesForIdFieldsForm = (typeof fieldsForm)[number]

export type FieldsList = LimitFields<UserHookType>

export type IconSvgProps = {
  size?: number
  width?: number
  height?: number
  color?: string
}

export type ListActionsProps = {
  id: number
  onclick?: (id: string) => void
  icon: string
  href?: string
  name?: string
}

export type ItemListType = {
  id: string
  info1: string
  info2: string
  info3: string
  info4: string
  info5: string
}

export type InfoList = {
  itemsHeader: Array<string>
  itemsList: FieldsList
  listActions?: ListActionsProps[]
  title?: string
  hrefButton?: string
  textButton?: string
  errorRequest?: string | null
}

export type Errors = {
  request?: string
} & { [key in (typeof fieldsForm)[number]]?: string }


export type OptionsTemplateForm = {
  label: string
  value: number | string
}

export interface Option {
  label: string;
  value: string;
}

export type FieldsTemplateForm<T> = {
  id: Path<T>
  required: boolean
  type: 'text' | 'date' | 'image' | 'select' | 'password' | 'file' | 'hidden' | 'selectSearch'
  label: string
  classInput?: string
  options?: T[]
  value?: string | number
  disabled?: boolean
  placeholder?: string
  optionKeyLabel?: keyof T
  optionKeyValue?: keyof T
}

export type BoxTemplateForm<T> = {
  id: number;
  fields: LimitFieldsForm<FieldsTemplateForm<T>>;
};

export type SectionTemplateForm<T> = {
  id: number
  title: string
  boxes: Array<BoxTemplateForm<T>>
}

export type TemplateForm<T> = {
  title: string
  textButton: string
  sections: Array<SectionTemplateForm<T>>
}

export type LimitColsGrid = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type ModelsAll = Segment &
  User &
  Unit &
  Course &
  TimeLine &
  Profile &
  Lead & {
    search: string
  }

  export type FieldsFormSchema<T> = {
    [key in keyof T]?: z.ZodTypeAny
  }

  type ZodObjectFromSchema<T> = {
    [key in keyof T]: z.ZodTypeAny;
  };
  
export type SchemaForm<T> = z.ZodObject<ZodObjectFromSchema<T>>

export type InitialState<T> = {
  errors?: T & {request?: string}
  ok?: boolean
  resp?: Models | Models[]
}

export type ServerAction<T> = (
  prevState: InitialState<T>,
  formData: FormData,
) => InitialState<T> | Promise<InitialState<T>>

export type GetDefaultValues<T> = () => Promise<InitialState<T> | Models>

export type Form<T> = {
  template: TemplateForm<T>
  loading?: boolean
  getDefaultValues?: {
    response?: Models
    error?: Errors
  }
  defaultValues?: DefaultValues<T>
  title?: string
  action: ServerAction<T>
  schema?: SchemaForm<T>
  pathSuccess: string
  handlerForm?: (data: ModelsAll) => void
  errorMessage?: string
}

export type ListAction = {
  id: number
  icon: string
  href?: string
  name: string
}

export type SearchType = {
  q: string
}

export interface ReturnLoadList {
  response?: Models[]
  error?: Errors
}
