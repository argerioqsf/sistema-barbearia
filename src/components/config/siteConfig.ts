export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  items_side_menu: [
    {
      id: "1",
      href: "/dashboard/home",
      label: "SIM",
      size: 45,
      image:
        "https://www.grupomadretereza.com.br/sim/themes/simadm/assets/images/logo.png",
    },
    {
      id: "2",
      label: "ARGÉRIO FILHO",
      href: "/dashboard/profile",
    },
    {
      id: "3",
      label: "Dashboard",
      href: "/dashboard/profile",
      icon: "DashBoard",
    },
    {
      id: "4",
      label: "Indicadores",
      icon: "HandPointLeft",
      subMenuList: [
        {
          id: "1",
          label: "Listagem",
          href: "/dashboard/indicators",
          icon: "Circle",
        },
        {
          id: "2",
          label: "Solicitações",
          href: "/dashboard/indicators/requests",
          icon: "Circle",
        },
        {
          id: "3",
          label: "Cadastrar Indicador",
          href: "/dashboard/indicators/register",
          icon: "Circle",
        },
      ],
    },
    {
      id: "5",
      label: "Leads",
      icon: "Users",
      subMenuList: [
        {
          id: "1",
          label: "Listagem",
          href: "/dashboard/leads",
          icon: "Circle",
        },
        {
          id: "2",
          label: "Novos Leads",
          href: "/dashboard/leads/new",
          icon: "Circle",
        },
        {
          id: "3",
          label: "Confirmados",
          href: "/dashboard/leads/confirmed",
          icon: "Circle",
        },
        {
          id: "4",
          label: "Aguard. Confirmação",
          href: "/dashboard/leads/waiting_confirmation",
          icon: "Circle",
        },
        {
          id: "5",
          label: "Cadastrar Leads",
          href: "/dashboard/leads/register",
          icon: "Circle",
        },
      ],
    },
    {
      id: "6",
      label: "Segmentos",
      icon: "Clipboard",
      subMenuList: [
        {
          id: "1",
          label: "Listagem",
          href: "/dashboard/segments",
          icon: "Circle",
        },
        {
          id: "2",
          label: "Cadastrar Segmento",
          href: "/dashboard/home",
          icon: "Circle",
        },
      ],
    },
    {
      id: "7",
      label: "Usuários",
      subMenuList: [
        {
          id: "1",
          label: "Listagem",
          href: "/dashboard/users",
          icon: "Circle",
        },
        {
          id: "2",
          label: "Cadastrar Usuários",
          href: "/dashboard/users/register",
          icon: "Circle",
        },
      ],
    },
    {
      id: "8",
      label: "Unidades",
      icon: "Clipboard",
      subMenuList: [
        {
          id: "1",
          label: "Listagem",
          href: "/dashboard/units",
          icon: "Circle",
        },
        {
          id: "2",
          label: "Cadastrar Unidade",
          href: "/dashboard/units/register",
          icon: "Circle",
        },
      ],
    },
    {
      id: "9",
      label: "Cursos",
      icon: "Clipboard",
      subMenuList: [
        {
          id: "1",
          label: "Listagem",
          href: "/dashboard/courses",
          icon: "Circle",
        },
        {
          id: "2",
          label: "Cadastrar Curso",
          href: "/dashboard/courses/register",
          icon: "Circle",
        },
      ],
    },
  ],
};
