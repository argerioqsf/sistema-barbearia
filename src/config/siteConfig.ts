import { CatalogIcons } from '@/utils/handleIcons'
import { UserAction } from '@/utils/checkUserPermissions'

export type ItemMenu = {
  id: string
  href?: string
  label: string
  size?: number
  image?: string
  icon?: keyof CatalogIcons
  userAction: UserAction
  subMenuList?: ItemMenu[]
  hidden?: boolean
  absolutePath?: boolean
}

export type Items = {
  id: number
  icon?: keyof CatalogIcons
  title: string
  link: string
  subtitle: string
}

export type SiteConfig = ItemMenu[]

export const siteConfig: SiteConfig = [
  {
    id: '3',
    label: 'Dashboard',
    href: '/dashboard/home',
    icon: 'LayoutDashboard',
    userAction: 'dashboard.view',
  },
  {
    id: '4',
    label: 'Indicadores',
    icon: 'Handshake',
    userAction: 'indicator.view',
    subMenuList: [
      {
        id: '1',
        label: 'Listagem',
        href: '/dashboard/indicators',
        icon: 'Circle',
        userAction: 'indicator.list',
      },
      {
        id: '2',
        label: 'Solicitações',
        href: '/dashboard/indicators/requests',
        icon: 'Circle',
        userAction: 'indicator_request.list',
      },
      {
        id: '3',
        label: 'Cadastrar Indicador',
        href: '/dashboard/indicators/register',
        icon: 'Circle',
        userAction: 'indicator.register',
      },
      {
        id: '4',
        label: 'Detail',
        href: '/dashboard/indicators/detail',
        icon: 'Circle',
        hidden: true,
        userAction: 'indicator.register',
      },
    ],
  },
  {
    id: '5',
    label: 'Leads',
    icon: 'Users',
    userAction: 'lead.view',
    subMenuList: [
      {
        id: '1',
        label: 'Listagem',
        href: '/dashboard/leads',
        icon: 'Circle',
        userAction: 'lead.view',
      },
      {
        id: '2',
        label: 'Novos Leads',
        href: '/dashboard/leads/new',
        icon: 'Circle',
        userAction: 'new_lead.list',
      },
      {
        id: '3',
        label: 'Confirmados',
        href: '/dashboard/leads/confirmed',
        icon: 'Circle',
        userAction: 'confirmed_lead.list',
      },
      {
        id: '4',
        label: 'Aguard. Confirmação',
        href: '/dashboard/leads/waiting_confirmation',
        icon: 'Circle',
        userAction: 'waiting_confirmation_lead.list',
      },
      {
        id: '5',
        label: 'Cadastrar Leads',
        href: '/dashboard/leads/register',
        icon: 'Circle',
        userAction: 'lead.register',
      },
      {
        id: '6',
        label: 'Detail',
        href: '/dashboard/leads/detail',
        icon: 'Circle',
        userAction: 'lead.detail',
        hidden: true,
        absolutePath: true,
      },
    ],
  },
  {
    id: '6',
    label: 'Usuários',
    userAction: 'user.view',
    subMenuList: [
      {
        id: '1',
        label: 'Listagem',
        href: '/dashboard/users',
        icon: 'Circle',
        userAction: 'user.list',
      },
      {
        id: '2',
        label: 'Cadastrar Usuários',
        href: '/dashboard/users/register',
        icon: 'Circle',
        userAction: 'user.register',
      },
      {
        id: '3',
        label: 'Detail',
        href: '/dashboard/users/detail',
        icon: 'Circle',
        hidden: true,
        absolutePath: true,
        userAction: 'user.detail',
      },
    ],
  },
  {
    id: '7',
    label: 'Unidades',
    icon: 'Users',
    userAction: 'unit.view',
    subMenuList: [
      {
        id: '1',
        label: 'Listagem',
        href: '/dashboard/units',
        icon: 'Circle',
        userAction: 'unit.list',
      },
      {
        id: '2',
        label: 'Cadastrar Unidade',
        href: '/dashboard/units/register',
        icon: 'Circle',
        userAction: 'unit.register',
      },
      {
        id: '3',
        label: 'Detail',
        href: '/dashboard/units/detail',
        icon: 'Circle',
        hidden: true,
        absolutePath: true,
        userAction: 'unit.detail',
      },
    ],
  },
  {
    id: '8',
    label: 'Seguimentos',
    icon: 'Clipboard',
    userAction: 'segment.view',
    subMenuList: [
      {
        id: '1',
        label: 'Listagem',
        href: '/dashboard/segments',
        icon: 'Circle',
        userAction: 'segment.list',
      },
      {
        id: '2',
        label: 'Cadastrar Segmento',
        href: '/dashboard/segments/register',
        icon: 'Circle',
        userAction: 'segment.register',
      },
      {
        id: '3',
        label: 'Detail',
        href: '/dashboard/segments/detail',
        icon: 'Circle',
        hidden: true,
        absolutePath: true,
        userAction: 'segment.detail',
      },
    ],
  },
  {
    id: '9',
    label: 'Cursos',
    icon: 'Clipboard',
    userAction: 'course.view',
    subMenuList: [
      {
        id: '1',
        label: 'Listagem',
        href: '/dashboard/courses',
        icon: 'Circle',
        userAction: 'course.list',
      },
      {
        id: '2',
        label: 'Cadastrar Curso',
        href: '/dashboard/courses/register',
        icon: 'Circle',
        userAction: 'course.register',
      },
      {
        id: '3',
        label: 'Detail',
        href: '/dashboard/courses/detail',
        icon: 'Circle',
        hidden: true,
        absolutePath: true,
        userAction: 'course.detail',
      },
    ],
  },
]

export const formations: Items[] = [
  {
    id: 1,
    icon: 'LockIcon',
    title: 'Seguro Madre',
    link: '/',
    subtitle: 'Com o seguro Madre, você aluno estuda sem preocupações.',
  },
  {
    id: 2,
    title: 'Clube Madre',
    icon: 'Shield',
    link: '/',
    subtitle: 'Alunos Madre tem acesso a um clube de vantagens exclusivas.',
  },
  {
    id: 3,
    title: 'Laboratórios',
    icon: 'TestTubeDiagonal',
    link: '/',
    subtitle:
      'Todos os laboratório possuem equipamentos modernos e profissionais.',
  },
]

export const benefits: Items[] = [
  {
    id: 1,
    icon: 'ThumbsUp',
    title: 'Você indica',
    link: '/',
    subtitle:
      'Ao realizar seu cadastro você se torna um indicador Madre e terá um link de indicação. É através desse link que seus indicados serão cadastrados no sistema.',
  },
  {
    id: 2,
    title: 'Nossos consultores',
    icon: 'Handshake',
    link: '/',
    subtitle:
      'Nosso time de consultores entra em contato com o indicado, apresenta as vantagens de se tornar um aluno Madre e assim que o indicado efetuar sua matrícula você ganha.',
  },
  {
    id: 3,
    title: 'Você recebe',
    icon: 'CircleDollarSign',
    link: '/',
    subtitle:
      'Você será remunerado por cada indicado que efetivar sua matrícula. E melhor, você pode acompanhar tudo através do seu painel.',
  },
]
