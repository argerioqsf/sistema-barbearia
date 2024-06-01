import { DefaultValues, Path } from 'react-hook-form'
import roles from '@/constants/roles.json'
import { z } from 'zod'
import { CatalogIcons } from '@/utils/handleIcons'

export type LimitFieldsForm<G> = [G, ...G[]] & {
  length: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

export type LimitFields<T> = [T, T, T, T, T]

export type Roles = typeof roles

export type Role = keyof Roles

export type Course = {
  id: string
  name: string
  quant_leads: number
  active: boolean
}

export type CourseProps = keyof Course

export type Segment = {
  id: string
  name: string
  createdAt: string
  courses?: { course: Course }[] | []
  // eslint-disable-next-line no-use-before-define
  units?: { unit: Unit }[] | []
}

export type SegmentProps = keyof Segment

export type Unit = {
  id: string
  name: string
  createdAt?: string
  segments?: { segment: Segment }[] | []
  courses?: { course: Course }[] | []
  _count?: {
    segments: number
    courses: number
  }
}

export type UnitProps = keyof Unit

export type Organization = {
  id: string
  name: string
  consultant_bonus: number
  indicator_bonus: number
  slug: string
  // eslint-disable-next-line no-use-before-define
  users: { user: User }[]
}

export type User = {
  id: string
  name: string
  email: string
  active: boolean
  password?: string
  // eslint-disable-next-line no-use-before-define
  profile: Profile | Record<string, never>
  createdAt: string
  units: Unit[]
  organizations: { organization: Organization }[]
}

export type UserProps = keyof User

export type Profile = {
  id: string
  phone: string
  cpf: string
  genre: string
  birthday: string
  pix: string
  role: Role
  user?: User
  userId: string
  // eslint-disable-next-line no-use-before-define
  leadsIndicator?: Lead[]
  city: string
  units?: { unit: Unit }[] | []
  amountToReceive?: number
}

export type ProfileProps = keyof Profile

export type TimeLine = {
  id: string
  title: string
  description: string
  status: string
  // eslint-disable-next-line no-use-before-define
  lead?: Lead
  leadsId: string
  course?: Course
  course_id?: string
  createdAt: string
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
  segmentId?: string
  courseId?: string
  unitId?: string
  archived: boolean
  matriculation?: boolean
  documents?: boolean
  course: Course
}

export type LeadProps = keyof Lead

export type Models = Segment | User | Unit | Course | TimeLine | Profile | Lead

const fieldsForm = [
  'id',
  'name',
  'createdAt',
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
  'segmentId',
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

export type FieldsList<T> = Path<T> | ''

export type IconSvgProps = {
  size?: number
  width?: number
  height?: number
  color?: string
}

export type ItemListType = {
  id: string
  info1: string
  info2: string
  info3: string
  info4: string
  info5: string
}

export type InitialState<T> = {
  errors?: Partial<T & { request?: string }>
  ok?: boolean
  resp?: T | T[]
}

export type Toast = {
  title: string
  description?: string
}

export type Alert = {
  title: string
  description?: string
}

export type ListAction<T> = {
  id: number
  icon: keyof CatalogIcons
  href?: string
  name: string
  onclick?: (id?: string) => void | Promise<InitialState<T>>
  getClipBoard?: (id: string) => Promise<string>
  toast?: Toast
  alert?: Alert
}

export type InfoList<T> = {
  itemsHeader: string[]
  itemsList: LimitFields<FieldsList<T>>
  listActions?: ListAction<T>[]
  title?: string
  hrefButton?: string
  textButton?: string
  errorRequest?: string | null
}

export type Errors<T> = Partial<T> & {
  request?: string
}

export type OptionsTemplateForm = {
  label: string
  value: number | string
}

export interface Option {
  label: string
  value: string | ''
}

export type OptionGeneric<T> = T | { value?: string; label?: string }

export type OptionKey<T> = Path<OptionGeneric<T>>

export type VariantOption = 'single' | 'multiple'

export type FieldsTemplateForm<T> = {
  id: Path<T>
  required: boolean
  type:
    | 'number'
    | 'text'
    | 'date'
    | 'image'
    | 'select'
    | 'password'
    | 'file'
    | 'hidden'
    | 'selectSearch'
  label: string
  classInput?: string
  value?: string | number
  disabled?: boolean
  placeholder?: string
  option?: {
    list?: OptionGeneric<T>[]
    keyLabel?: OptionKey<T>
    keyValue?: OptionKey<T>
    variant?: VariantOption
    values?: string[]
    onDelete?: (id: string, formDataExtra: FormData) => void
    onChange?: (id?: string) => void
  }
  displayLogic?: {
    fieldId: string
    expectedValue?: string
  }
}

export type BoxTemplateForm<T> = {
  id: number
  fields: LimitFieldsForm<FieldsTemplateForm<T>>
}

export type SectionTemplateForm<T> = {
  id: number
  title: string
  boxes: Array<BoxTemplateForm<T>>
}

export type TemplateForm<T> = {
  title: string
  textButton: string
  sections: SectionTemplateForm<T>[]
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
  [key in keyof T]: z.ZodTypeAny
}

export type SchemaForm<T> = z.ZodObject<ZodObjectFromSchema<T>>

export type ServerAction<T> = (
  prevState: InitialState<T>,
  formData: FormData,
) => InitialState<T> | Promise<InitialState<T>>

export type ServerActionId<T> = (
  id: string,
  prevState: InitialState<T>,
  formData: FormData,
) => InitialState<T> | Promise<InitialState<T>>

export type GetDefaultValues<T> = () => Promise<InitialState<T> | Models>

export type Form<T> = {
  template: TemplateForm<T>
  loading?: boolean
  getDefaultValues?: {
    response?: T
    error?: Errors<T>
  }
  defaultValues?: DefaultValues<T>
  title?: string
  action: ServerAction<T>
  schema?: SchemaForm<T>
  pathSuccess: string
  handlerForm?: (data: T) => void
  errorMessage?: string
}

export type SearchType = {
  q?: string
}

export interface ReturnList<T> {
  response?: T[]
  count?: number
  error?: Errors<T>
}

export interface ReturnGet<T> {
  response?: T
  error?: Errors<T>
}

export type SearchParams = {
  params?: { locale: string }
  searchParams?: {
    q: string
    page: string
  }
}
