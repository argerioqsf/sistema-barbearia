import { CircleIcon } from "../Icons/CircleIcon";
import { ClipboardIcon } from "../Icons/ClipboardIcon";
import { DashBoardIcon } from "../Icons/DashBoardIcon";
import { HandPointLeftIcon } from "../Icons/HandPointLeftIcon";
import { UsersIcon } from "../Icons/UsersIcon";

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
          href: "/dashboard/home",
          icon: "Circle",
        },
        {
          id: "3",
          label: "Cadastrar Indicador",
          href: "/dashboard/profile",
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
          label: "Novos Leads",
          href: "/dashboard/home",
          icon: "Circle",
        },
        {
          id: "2",
          label: "Listagem",
          href: "/dashboard/home",
          icon: "Circle",
        },
        {
          id: "3",
          label: "Confirmados",
          href: "/dashboard/perfil",
          icon: "Circle",
        },
        {
          id: "4",
          label: "Cadastrar Leads",
          href: "/dashboard/perfil",
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
          href: "/dashboard/home",
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
  ],
};
