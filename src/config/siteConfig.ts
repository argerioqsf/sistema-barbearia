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
    id: '1',
    label: 'Dashboard',
    href: '/dashboard/home',
    icon: 'LayoutDashboard',
    userAction: 'dashboard.view',
  },
  {
    id: '2',
    label: 'Produtos',
    icon: 'ShoppingBag',
    userAction: 'products.view',
    subMenuList: [
      {
        id: '1',
        label: 'Listagem',
        href: '/dashboard/products',
        icon: 'Circle',
        userAction: 'products.list',
      },
      {
        id: '2',
        label: 'Cadastrar produtos',
        href: '/dashboard/products/register',
        icon: 'Circle',
        userAction: 'products.register',
      },
    ],
  },
  {
    id: '3',
    label: 'Cupons',
    icon: 'TicketPercent',
    userAction: 'coupons.view',
    subMenuList: [
      {
        id: '1',
        label: 'Listagem',
        href: '/dashboard/coupons',
        icon: 'Circle',
        userAction: 'coupons.list',
      },
      {
        id: '1',
        label: 'Desativos',
        href: '/dashboard/coupons',
        icon: 'Circle',
        userAction: 'coupons.list',
      },
      {
        id: '2',
        label: 'Cadastrar cupons',
        href: '/dashboard/coupons/register',
        icon: 'Circle',
        userAction: 'coupons.register',
      },
    ],
  },
  {
    id: '4',
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
        id: '5',
        label: 'Listagem Desativados',
        href: '/dashboard/users/disabled',
        icon: 'Circle',
        userAction: 'user.list.disabled',
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
      {
        id: '4',
        label: 'Resetar senha',
        href: '/dashboard/users/resetPassword',
        icon: 'Circle',
        userAction: 'user.resetPassword',
      },
    ],
  },
  {
    id: '5',
    label: 'Agendamentos',
    href: '/dashboard/appointments',
    icon: 'CalendarCheck',
    userAction: 'appointments.view',
  },
  {
    id: '6',
    label: 'Caixa',
    href: '/dashboard/cashier',
    icon: 'Wallet',
    userAction: 'cashier.view',
  },
  {
    id: '7',
    label: 'Vendas',
    href: '/dashboard/sales',
    icon: 'ShoppingCart',
    userAction: 'sales.view',
  },
  {
    id: '7',
    label: 'Configurações',
    href: '/dashboard/settings',
    icon: 'Cog',
    userAction: 'settings.view',
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
