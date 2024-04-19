import { Role } from '@/types/general'
import { CatalogIcons } from '@/utils/handleIcons'

export type ItemMenu = {
  id: string
  href?: string
  label: string
  size?: number
  image?: string
  icon?: keyof CatalogIcons
  roles?: Role[]
  subMenuList?: ItemMenu[]
  hidden?: boolean
  absolutePath?: boolean
}

export type SiteConfig = {
  items_side_menu: ItemMenu[]
}

export const siteConfig: SiteConfig = {
  items_side_menu: [
    {
      id: '1',
      href: '/dashboard/home',
      label: 'SIM',
      size: 45,
      image:
        'https://www.grupomadretereza.com.br/sim/themes/simadm/assets/images/logo.png',
      roles: [
        'coordinator',
        'administrator',
        'indicator',
        'consultant',
        'financial',
      ],
    },
    {
      id: '2',
      label: 'ARGÉRIO FILHO',
      href: '/dashboard/profile',
      roles: [
        'coordinator',
        'administrator',
        'indicator',
        'consultant',
        'financial',
      ],
    },
    {
      id: '3',
      label: 'Dashboard',
      href: '/dashboard/home',
      icon: 'LayoutDashboard',
      roles: ['administrator'],
    },
    {
      id: '4',
      label: 'Indicadores',
      icon: 'Handshake',
      subMenuList: [
        {
          id: '1',
          label: 'Listagem',
          href: '/dashboard/indicators',
          icon: 'Circle',
          roles: ['administrator'],
        },
        {
          id: '2',
          label: 'Solicitações',
          href: '/dashboard/indicators/requests',
          icon: 'Circle',
          roles: ['administrator'],
        },
        {
          id: '3',
          label: 'Cadastrar Indicador',
          href: '/dashboard/indicators/register',
          icon: 'Circle',
          roles: ['administrator'],
        },
        {
          id: '4',
          label: 'Detail',
          href: '/dashboard/indicators/detail',
          icon: 'Circle',
          roles: ['administrator'],
          hidden: true,
          absolutePath: true,
        },
      ],
      roles: ['administrator'],
    },
    {
      id: '5',
      label: 'Leads',
      icon: 'Users',
      subMenuList: [
        {
          id: '1',
          label: 'Listagem',
          href: '/dashboard/leads',
          icon: 'Circle',
          roles: ['administrator'],
        },
        {
          id: '2',
          label: 'Novos Leads',
          href: '/dashboard/leads/new',
          icon: 'Circle',
          roles: ['administrator'],
        },
        {
          id: '3',
          label: 'Confirmados',
          href: '/dashboard/leads/confirmed',
          icon: 'Circle',
          roles: ['administrator'],
        },
        {
          id: '4',
          label: 'Aguard. Confirmação',
          href: '/dashboard/leads/waiting_confirmation',
          icon: 'Circle',
          roles: ['administrator'],
        },
        {
          id: '5',
          label: 'Cadastrar Leads',
          href: '/dashboard/leads/register',
          icon: 'Circle',
          roles: ['administrator'],
        },
        {
          id: '6',
          label: 'Detail',
          href: '/dashboard/leads/detail',
          icon: 'Circle',
          roles: ['administrator'],
          hidden: true,
          absolutePath: true,
        },
      ],
      roles: ['administrator'],
    },
    {
      id: '6',
      label: 'Usuários',
      subMenuList: [
        {
          id: '1',
          label: 'Listagem',
          href: '/dashboard/users',
          icon: 'Circle',
          roles: ['administrator'],
        },
        {
          id: '2',
          label: 'Cadastrar Usuários',
          href: '/dashboard/users/register',
          icon: 'Circle',
          roles: ['administrator'],
        },
        {
          id: '3',
          label: 'Detail',
          href: '/dashboard/users/detail',
          icon: 'Circle',
          roles: ['administrator'],
          hidden: true,
          absolutePath: true,
        },
      ],
      roles: ['administrator'],
    },
    {
      id: '7',
      label: 'Unidades',
      icon: 'Users',
      subMenuList: [
        {
          id: '1',
          label: 'Listagem',
          href: '/dashboard/units',
          icon: 'Circle',
          roles: ['administrator'],
        },
        {
          id: '2',
          label: 'Cadastrar Unidade',
          href: '/dashboard/units/register',
          icon: 'Circle',
          roles: ['administrator'],
        },
        {
          id: '3',
          label: 'Detail',
          href: '/dashboard/units/detail',
          icon: 'Circle',
          roles: ['administrator'],
          hidden: true,
          absolutePath: true,
        },
      ],
      roles: ['administrator'],
    },
    {
      id: '8',
      label: 'Segmentos',
      icon: 'Clipboard',
      subMenuList: [
        {
          id: '1',
          label: 'Listagem',
          href: '/dashboard/segments',
          icon: 'Circle',
          roles: ['coordinator', 'administrator'],
        },
        {
          id: '2',
          label: 'Cadastrar Segmento',
          href: '/dashboard/segments/register',
          icon: 'Circle',
          roles: ['coordinator', 'administrator'],
        },
        {
          id: '3',
          label: 'Detail',
          href: '/dashboard/segments/detail',
          icon: 'Circle',
          roles: ['coordinator', 'administrator'],
          hidden: true,
          absolutePath: true,
        },
      ],
      roles: ['coordinator', 'administrator'],
    },
    {
      id: '9',
      label: 'Cursos',
      icon: 'Clipboard',
      subMenuList: [
        {
          id: '1',
          label: 'Listagem',
          href: '/dashboard/courses',
          icon: 'Circle',
          roles: ['coordinator', 'administrator'],
        },
        {
          id: '2',
          label: 'Cadastrar Curso',
          href: '/dashboard/courses/register',
          icon: 'Circle',
          roles: ['coordinator', 'administrator'],
        },
        {
          id: '3',
          label: 'Detail',
          href: '/dashboard/courses/detail',
          icon: 'Circle',
          roles: ['coordinator', 'administrator'],
          hidden: true,
          absolutePath: true,
        },
      ],
      roles: ['coordinator', 'administrator'],
    },
  ],
}
