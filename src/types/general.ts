import { z } from 'zod'

type LimitFieldsForm<T> = [T, ...T[]] & {
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
  status: number
}

export type CourseProps = keyof Course

export type Unit = {
  id: string
  name: string
  created_at: string
  segments: Array<{ segment: Segment }>
  courses: Array<{ course: Course }>
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
  'segments.length',
  'courses.length',
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

export type FieldsFormSchema = {
  [key in (typeof fieldsForm)[number]]?: z.ZodTypeAny
}

export type OptionsTemplateForm = {
  label: string
  value: number | string
}

export type FieldsTemplateForm = {
  id: TypesForIdFieldsForm
  required: boolean
  type: 'text' | 'date' | 'image' | 'select' | 'password' | 'file' | 'hidden'
  label: string
  classInput?: string
  options?: Array<OptionsTemplateForm>
  value?: string | number
  disabled?: boolean
  placeholder?: string
}

export type BoxTemplateForm = {
  id: number
  fields: LimitFieldsForm<FieldsTemplateForm>
}

export type SectionTemplateForm = {
  id: number
  title: string
  boxes: Array<BoxTemplateForm>
}

export type TemplateForm = {
  title: string
  textButton: string
  sections: Array<SectionTemplateForm>
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

export type SchemaForm = z.ZodObject<FieldsFormSchema>

export type InitialState = {
  errors: Errors | null
  ok?: boolean
  resp?: Models | Models[]
}

export type ServerAction = (
  prevState: InitialState,
  formData: FormData,
) => InitialState | Promise<InitialState>

export type GetDefaultValues = () => Promise<InitialState | Models>

export type Form = {
  template: TemplateForm
  loading?: boolean
  getDefaultValues?: {
    response?: Models
    error?: Errors
  }
  defaultValues?: Models
  title?: string
  action: ServerAction
  schema?: SchemaForm
  pathSuccess: string
  handlerForm?: (data: ModelsAll) => void
  errorMessage?: string
}

export type ListAction = {
  id: number
  onclick?: (id: string) => void
  icon: string
  href?: string
  name: string
}

export type SearchType = {
  q: string
}

export interface ReturnLoadDetails {
  response?: Models
  error?: Errors
}
